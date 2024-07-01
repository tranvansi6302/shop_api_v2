// Các biến liên quan đến database snake_case dateOfBirth -> date_of_birth
// Các biến trong js camelCase dateOfBirth -> dateOfBirth

const response = {
    success: true, // true thành công, false thất bại (validate, server error)
    message: 'Thành công', // Thông điệp trả về
    result: {} // Kết quả trả về
}

// Thêm -> POST -> trả về success với message và kết quả vừa thêm
// Sửa -> PATCH -> trả về success với message và kết quả vừa sửa
// Xóa -> DELETE -> trả về success với message
// Lấy thông tin -> GET -> trả về success với result
