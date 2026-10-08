# AH BriefFlow v0.2 — duyệt nội dung trước khi publish

Bản sửa dựa trên website/code v0.1 đã tạo trong cuộc trò chuyện, **không phải bản clone GitHub private hiện thời**. Trước khi copy, kiểm tra mã nguồn của bạn chưa có chỉnh sửa khác.

## Các thông tin bắt buộc bạn xác nhận

1. LinkedIn bạn cung cấp hiển thị **Tuấn Anh Đặng**, URL **https://www.linkedin.com/in/tuanahn03/**. Trong HTML mới mình dùng đúng thông tin hiển thị trong ảnh. Kiểm tra bạn thực sự muốn công khai tên này và URL chính xác trước khi push.
2. Mục Founder gọi AH Solutions là **founder-led early-stage software project**, không khẳng định đã đăng ký công ty. Nếu tình trạng thực tế khác, sửa lại.
3. Website viết **Vietnam**, không tự khai thành phố, địa chỉ văn phòng hoặc quốc gia đăng ký pháp nhân.
4. **Ngày bắt đầu dự án chưa xác nhận nên không điền ngày.** Khi bạn cung cấp tháng/năm thật, có thể bổ sung; đừng suy từ © 2026.
5. Mô hình **team subscription** được ghi rõ là **pricing hypothesis**, không phải gói đang bán. Nếu không thực sự định thử mô hình này, thay hoặc xóa phần đó.
6. Claude API vẫn **PLANNED**. Demo mới vẫn dùng quy tắc JavaScript, không phải AI agent.

## Những gì bản cập nhật thay đổi

- Thêm Founder/About + LinkedIn và liên kết điều hướng.
- Thêm người sử dụng, người có thể mua, giả thuyết mô hình trả phí.
- Bổ sung roadmap Claude API với cách đánh giá: missed requirements, unsupported additions, human edits.
- Sửa tuyên bố PDF upload (chưa hỗ trợ).
- Demo phân loại: functional, non-functional, context, constraints, out-of-scope, open decisions.
- Thay mô tả xử lý brief: local browser JavaScript, không gửi brief đến AH Solutions backend hay AI API; yêu cầu tải asset/hosting analytics vẫn có thể diễn ra.
- Phần output có thông báo giới hạn 80 statements, không âm thầm bỏ bớt như v0.1.

## Hướng dẫn Windows CMD

Đầu tiên xác nhận không có sửa đổi chưa commit:

```cmd
cd /d D:\Apps\Projects\ahsolutions-website
git status --short
git pull origin main
git switch -c feature/review-founder-and-demo
```

Giải nén `AH-BriefFlow-v0.2-review-update.zip` vào `D:\Apps\Projects\`, tạo thư mục `D:\Apps\Projects\AH-BriefFlow-v0.2-review-update`.

Từ thư mục repository đang mở, chạy:

```cmd
copy /Y "..\AH-BriefFlow-v0.2-review-update\index.html" "index.html"
copy /Y "..\AH-BriefFlow-v0.2-review-update\src\styles.css" "src\styles.css"
copy /Y "..\AH-BriefFlow-v0.2-review-update\demo\index.html" "demo\index.html"
copy /Y "..\AH-BriefFlow-v0.2-review-update\src\demo.ts" "src\demo.ts"
copy /Y "..\AH-BriefFlow-v0.2-review-update\src\demo.css" "src\demo.css"
copy /Y "..\AH-BriefFlow-v0.2-review-update\src\brief-engine.ts" "src\brief-engine.ts"
```

Kiểm tra:

```cmd
npm run build
npm run dev
```

Mở `http://127.0.0.1:5173/` và `http://127.0.0.1:5173/demo/`, thử brief phòng khám và các câu: `No mobile app for v1. Budget is capped at $4000.`

**Chỉ sau khi duyệt lại thông tin Founder**, commit và push (nếu bạn muốn giữ quy trình Pull Request, có thể push nhánh trước và mở PR):

```cmd
git add index.html demo/index.html src/styles.css src/demo.css src/demo.ts src/brief-engine.ts
git commit -m "Clarify founder, roadmap and structured brief analysis"
git push -u origin feature/review-founder-and-demo
```

Để Cloudflare Pages đang theo `main` triển khai, bạn cần **merge nhánh này vào `main`** trên GitHub bằng Pull Request, kiểm tra build rồi merge. Không cần chạm tới Cloudflare DNS hoặc email routing.
