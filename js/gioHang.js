import { gioHang } from "./data.js";

// Dinh dang so tien theo cach hien thi tien Viet Nam.
export function dinhDangTien(soTien) {
    return new Intl.NumberFormat("vi-VN").format(soTien) + " đ";
}

// reduce() tinh tong thanh tien cua tat ca san pham.
export function layTongTien() {
    return gioHang.reduce((tong, sanPham) => {
        return tong + sanPham.donGia * sanPham.soLuong;
    }, 0);
}

// Hien thi mang gioHang len bang HTML.
export function hienThiGioHang() {
    const tbody = document.getElementById("cart-list");
    const cartCount = document.getElementById("cart-count");
    const totalAmount = document.getElementById("total-amount");

    const html = gioHang.map((sanPham, index) => `
        <tr>
            <td class="col-number align-center">${index + 1}</td>
            <td>
                <img class="product-image" src="${sanPham.hinhAnh}" alt="${sanPham.tenSanPham}">
            </td>
            <td class="product-name">
                ${sanPham.tenSanPham}
                <span class="product-id">Mã: ${sanPham.id}</span>
            </td>
            <td class="price align-right">${dinhDangTien(sanPham.donGia)}</td>
            <td class="align-center">
                <input
                    class="quantity-input"
                    type="number"
                    min="1"
                    step="1"
                    value="${sanPham.soLuong}"
                    data-id="${sanPham.id}"
                    aria-label="Số lượng ${sanPham.tenSanPham}"
                >
            </td>
            <td class="price align-right">${dinhDangTien(sanPham.donGia * sanPham.soLuong)}</td>
            <td class="align-center">
                <button
                    type="button"
                    class="btn-delete"
                    data-id="${sanPham.id}"
                    aria-label="Xóa ${sanPham.tenSanPham}"
                >Xóa</button>
            </td>
        </tr>
    `).join("");

    tbody.innerHTML = html || `
        <tr>
            <td class="empty-cart" colspan="7">Giỏ hàng đang trống.</td>
        </tr>
    `;

    cartCount.textContent = `(${gioHang.length} sản phẩm)`;
    totalAmount.textContent = dinhDangTien(layTongTien());

    // Moi lan render lai bang, gan lai su kien cho cac nut va input vua tao.
    ganSuKienXoaSanPham();
    ganSuKienThayDoiSoLuong();
}

// Xoa san pham dua vao id bang findIndex() va splice().
export function xoaSanPhamTheoId(id) {
    const index = gioHang.findIndex(sanPham => sanPham.id === id);

    if (index !== -1) {
        gioHang.splice(index, 1);
        hienThiGioHang();
    }
}

function ganSuKienXoaSanPham() {
    const buttons = document.querySelectorAll(".btn-delete");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            xoaSanPhamTheoId(id);
        });
    });
}

// Cap nhat so luong cho dung san pham khi input thay doi.
export function capNhatSoLuongSanPham(id, soLuongMoi) {
    const index = gioHang.findIndex(sanPham => sanPham.id === id);

    if (index === -1) {
        return;
    }

    if (!Number.isInteger(soLuongMoi) || soLuongMoi < 1) {
        alert("Số lượng phải là số nguyên lớn hơn hoặc bằng 1!");
        hienThiGioHang();
        return;
    }

    gioHang[index].soLuong = soLuongMoi;
    hienThiGioHang();
}

function ganSuKienThayDoiSoLuong() {
    const inputs = document.querySelectorAll(".quantity-input");

    inputs.forEach(input => {
        input.addEventListener("change", () => {
            const id = input.dataset.id;
            const soLuongMoi = Number(input.value);
            capNhatSoLuongSanPham(id, soLuongMoi);
        });
    });
}

// Xoa tat ca phan tu trong mang, sau do cap nhat giao dien.
export function xoaTatCaSanPham() {
    gioHang.splice(0, gioHang.length);
    hienThiGioHang();
}


// Ham khoi tao toan bo chuc nang cua trang gio hang.
// main.js chi can import va goi ham nay.
export function khoiTaoGioHang() {
    hienThiGioHang();

    // Xu ly nut Xoa tat ca.
    const btnDeleteAll = document.getElementById("btn-delete-all");
    btnDeleteAll.addEventListener("click", () => {
        if (gioHang.length === 0) {
            alert("Giỏ hàng đang trống!");
            return;
        }

        const dongY = confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?");
        if (dongY) {
            xoaTatCaSanPham();
        }
    });

    // Xu ly nut Thanh toan (minh hoa, chua ket noi cong thanh toan that).
    const btnCheckout = document.getElementById("btn-checkout");
    btnCheckout.addEventListener("click", () => {
        const tongTien = layTongTien();

        if (tongTien === 0) {
            alert("Bạn chưa có sản phẩm để thanh toán!");
            return;
        }

        alert(`Tổng tiền cần thanh toán: ${dinhDangTien(tongTien)}.`);
    });
}
