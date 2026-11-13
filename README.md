# MaterialQuiz

MaterialQuiz là ứng dụng web làm bài trắc nghiệm A/B/C/D mã nguồn mở, chạy hoàn toàn trong trình duyệt. Người dùng chọn hoặc kéo-thả một tệp JSON, làm bài, xem kết quả và xem lại đáp án.

Ứng dụng không có tài khoản, backend, cơ sở dữ liệu hay trình soạn thảo câu hỏi. Tệp bài kiểm tra chỉ được đọc cục bộ bằng File API và không được tải lên máy chủ.

## Tính năng

- Tải tệp `.json` bằng bộ chọn tệp hoặc kéo-thả.
- Kiểm tra tính hợp lệ của tệp trước khi bắt đầu.
- Làm bài trắc nghiệm với bốn lựa chọn A, B, C, D.
- Di chuyển giữa các câu, bỏ qua câu và thay đổi đáp án trước khi nộp bài.
- Xác nhận trước khi nộp bài khi còn câu chưa trả lời.
- Xem điểm, số câu đúng, sai, chưa trả lời và phần trăm.
- Xem lại đáp án đúng, đáp án đã chọn và giải thích nếu có.
- Chế độ sáng, tối và theo hệ điều hành; lưu lựa chọn giao diện trong `localStorage`.
- Giao diện tiếng Việt, responsive và hỗ trợ điều hướng bằng bàn phím.

## Chạy dự án

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## GitHub Pages

Dự án được cấu hình để triển khai lên GitHub Pages tại:

```text
https://enderbk0.github.io/materialquiz/
```

Workflow `.github/workflows/deploy-pages.yml` sẽ build và triển khai mỗi khi có commit mới trên nhánh `main`. Trong Settings → Pages, chọn **GitHub Actions** làm source.

## Định dạng JSON

```json
{
  "title": "Bài kiểm tra Tin học",
  "description": "Kiểm tra kiến thức cơ bản",
  "questions": [
    {
      "id": "q1",
      "question": "CPU là viết tắt của cụm từ nào?",
      "options": {
        "A": "Central Processing Unit",
        "B": "Computer Personal Unit",
        "C": "Central Program Utility",
        "D": "Control Processing User"
      },
      "correctAnswer": "A",
      "explanation": "CPU là viết tắt của Central Processing Unit."
    }
  ]
}
```

### Quy tắc

- `title`: bắt buộc, chuỗi không rỗng.
- `description`: không bắt buộc.
- `questions`: bắt buộc, mảng không rỗng.
- `id`: bắt buộc, duy nhất trong bài kiểm tra.
- `question`: bắt buộc, chuỗi không rỗng.
- `options`: phải có đúng bốn khóa `A`, `B`, `C`, `D`, mỗi giá trị là chuỗi không rỗng.
- `correctAnswer`: bắt buộc và phải là `A`, `B`, `C`, hoặc `D`.
- `explanation`: không bắt buộc.

Tệp mẫu để thử nghiệm nằm tại `public/sample-quiz.json`.

## Giấy phép và ghi nhận

Xem `LICENSE` và `NOTICE`. MaterialQuiz được phát hành theo MIT License. Dự án không liên kết với hay được chứng thực bởi Google; Material Design và Material 3 là thương hiệu của Google.
