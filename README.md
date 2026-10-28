# Bài mẫu: Giỏ hàng sản phẩm (HTML, CSS, JavaScript Module)

## Cấu trúc

- `index.html`: cấu trúc giao diện.
- `assets/css/style.css`: giao diện giỏ hàng.
- `assets/images/`: hai hình minh họa SVG dùng cục bộ.
- `js/data.js`: mảng object `gioHang`.
- `js/gioHang.js`: render giỏ hàng, tính tổng tiền, xóa theo id, cập nhật số lượng và xóa tất cả.
- `js/main.js`: chỉ import và gọi hàm `khoiTaoGioHang()` từ `gioHang.js`.
- `khoiTaoGioHang()` trong `js/gioHang.js`: hiển thị giỏ hàng ban đầu và đăng ký sự kiện nút Xóa tất cả, Thanh toán minh họa.

## Chạy bài

Mở thư mục bằng VS Code và chạy `index.html` với Live Server.

## Nội dung JavaScript được dùng

- Mảng chứa object.
- `map()` và `join()` để render HTML.
- `reduce()` để tính tổng tiền.
- `findIndex()` và `splice()` để xóa sản phẩm theo id.
- `addEventListener()` để nghe click và thay đổi số lượng.
- Hàm khởi tạo `khoiTaoGioHang()` để gom việc khởi tạo giao diện và đăng ký sự kiện.
- `import` / `export` để tổ chức JavaScript Module.

Nút Thanh toán chỉ hiển thị tổng tiền bằng `alert`, không kết nối cổng thanh toán thực tế.
