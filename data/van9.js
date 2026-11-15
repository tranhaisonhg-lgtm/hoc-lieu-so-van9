/* ============================================================
   DỮ LIỆU HỌC LIỆU SỐ – giáo viên chỉ cần sửa file này.
   Mỗi bài học là một dòng trong "baiHoc". Dán link vào 4 ô:
   video (YouTube), taiLieu (Drive/Docs), baiGiang (Slides/Canva), phieu (Docs/Drive).
   Ô nào để "" thì tab đó hiện "Chưa có học liệu".
   ============================================================ */
window.HOC_LIEU = {
  tacGia: "Trần Hải Sơn, giáo viên",
  truong: "Trường PTDTBT THCS Sủng Máng, xã Sủng Máng, tỉnh Tuyên Quang",
  lienHe: "Zalo 0963.047.578, email thson.thcssungmangmeovac@hagiang.edu.vn",

  khoi: [
    { id: 6, ten: "Khối 6" },
    { id: 7, ten: "Khối 7" },
    { id: 8, ten: "Khối 8" },
    { id: 9, ten: "Khối 9", mo: true }
  ],
  monHoc: ["Ngữ văn", "Toán", "Tiếng Anh", "Khoa học tự nhiên", "Lịch sử và Địa lí", "Tin học", "Công nghệ", "Giáo dục công dân"],

  /* Khóa của mỗi môn có dạng "khối-môn", ví dụ "9-Ngữ văn" */
  baiHoc: {
    "9-Ngữ văn": [
      { tuan: "4", chuyende: "Tiếng Việt", ten: "Ôn tập phương thức biểu đạt", mota: "", video: "", taiLieu: "", baiGiang: "", phieu: "" },
      { tuan: "5", chuyende: "Tiếng Việt", ten: "Ôn tập biện pháp tu từ" },
      { tuan: "6", chuyende: "Tiếng Việt", ten: "Luyện tập xác định phương thức biểu đạt, biện pháp tu từ" },
      { tuan: "7", chuyende: "Truyện", ten: "Truyện truyền kì, truyện trinh thám, truyện ngắn hiện đại" },
      { tuan: "8", chuyende: "Truyện", ten: "Luyện tập đọc hiểu truyện" },
      { tuan: "9", chuyende: "Truyện thơ Nôm", ten: "Ôn tập truyện thơ Nôm" },
      { tuan: "10", chuyende: "Thơ", ten: "Thơ song thất lục bát, thơ tám chữ" },
      { tuan: "11", chuyende: "Thơ", ten: "Luyện tập đọc hiểu thơ tám chữ, song thất lục bát" },
      { tuan: "12", chuyende: "Viết", ten: "Viết đoạn văn nghị luận xã hội, đoạn văn cảm nghĩ về thơ tám chữ" },
      { tuan: "13", chuyende: "Viết", ten: "Luyện viết đoạn văn nghị luận xã hội và cảm nghĩ về thơ tám chữ" },
      { tuan: "14", chuyende: "Viết", ten: "Viết bài văn nghị luận về một vấn đề cần giải quyết" },
      { tuan: "14-15", chuyende: "Viết", ten: "Luyện đề nghị luận về một vấn đề cần giải quyết" },
      { tuan: "16", chuyende: "Bi kịch", ten: "Ôn tập bi kịch" },
      { tuan: "17", chuyende: "Bi kịch", ten: "Luyện tập đọc hiểu bi kịch" },
      { tuan: "18", chuyende: "Văn bản nghị luận", ten: "Kiến thức cơ bản về văn bản nghị luận" },
      { tuan: "19-20", chuyende: "Văn bản nghị luận", ten: "Luyện tập đọc hiểu văn bản nghị luận" },
      { tuan: "21", chuyende: "Văn bản thông tin", ten: "Ôn tập văn bản thông tin" },
      { tuan: "22-23", chuyende: "Văn bản thông tin", ten: "Luyện tập đọc hiểu văn bản thông tin" },
      { tuan: "24", chuyende: "Viết", ten: "Cách viết đoạn văn nghị luận xã hội (200 chữ)" },
      { tuan: "25", chuyende: "Viết", ten: "Luyện viết đoạn văn nghị luận xã hội (200 chữ)" },
      { tuan: "26", chuyende: "Viết", ten: "Cách làm bài cảm nghĩ về thơ tám chữ" },
      { tuan: "27", chuyende: "Viết", ten: "Luyện viết đoạn văn cảm nghĩ về một bài thơ tám chữ" },
      { tuan: "28", chuyende: "Viết", ten: "Phân tích đặc điểm nhân vật truyện" },
      { tuan: "29-30", chuyende: "Viết", ten: "Luyện viết bài văn phân tích đặc điểm nhân vật truyện" },
      { tuan: "31", chuyende: "Viết", ten: "Bài văn nghị luận về một vấn đề cần giải quyết" },
      { tuan: "32-33", chuyende: "Viết", ten: "Luyện viết bài văn nghị luận về một vấn đề cần giải quyết" },
      { tuan: "34", chuyende: "Viết", ten: "Cấu trúc bài phân tích tác phẩm văn học" },
      { tuan: "35", chuyende: "Viết", ten: "Luyện viết bài văn phân tích tác phẩm văn học" }
    ]
  }
};
