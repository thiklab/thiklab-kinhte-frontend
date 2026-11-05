export type EconomyLane = "vn" | "wd";
export type EconomyPhase = [year: number, name: string];
export type EconomyEvent = [lane: EconomyLane, year: number, text: string];

export const ECO_MIN = 1986;
export const ECO_MAX = 2026;

export const ECO_NAMES: Record<EconomyLane, string> = { vn: "Việt Nam", wd: "Thế giới" };
export const ECO_TAGS: Record<EconomyLane, string> = { vn: "VN", wd: "TG" };
export const ECO_LANES: EconomyLane[] = ["vn", "wd"];

export const ECO_R: Record<EconomyLane, EconomyPhase[]> = {
  vn: [
    [1986, "Khởi động Đổi Mới"],
    [1989, "Ổn định, phá thế cô lập"],
    [1995, "Hội nhập ASEAN – Mỹ"],
    [2007, "WTO & tăng trưởng nóng"],
    [2011, "Tái cơ cấu, ổn định"],
    [2016, "FTA thế hệ mới"],
    [2020, "COVID & phục hồi"],
    [2023, "Thích ứng & tăng tốc"],
  ],
  wd: [
    [1986, "Cuối Chiến tranh Lạnh"],
    [1991, "Trật tự hậu Liên Xô"],
    [1997, "Khủng hoảng châu Á"],
    [2001, "TQ vào WTO, bùng nổ"],
    [2008, "Khủng hoảng tài chính"],
    [2013, "Phục hồi chậm"],
    [2018, "Thương chiến"],
    [2020, "COVID-19"],
    [2022, "Lạm phát & thắt chặt"],
    [2025, "Thuế quan & phân mảnh"],
  ],
};

export const ECO_E: EconomyEvent[] = [
  ["vn", 1986, "Đại hội VI khởi xướng Đổi Mới"],
  ["vn", 1987, "Ban hành Luật Đầu tư nước ngoài"],
  ["vn", 1988, "Khoán 10: giao đất, trao quyền tự chủ cho hộ nông dân"],
  ["vn", 1989, "Thả nổi giá, Việt Nam trở lại xuất khẩu gạo"],
  ["vn", 1993, "Nối lại quan hệ tín dụng với IMF và Ngân hàng Thế giới"],
  ["vn", 1994, "Mỹ dỡ bỏ lệnh cấm vận thương mại"],
  ["vn", 1995, "Gia nhập ASEAN, bình thường hóa quan hệ với Mỹ"],
  ["vn", 1997, "Tăng trưởng chậm lại sau khủng hoảng châu Á"],
  ["vn", 2000, "Ký BTA với Mỹ, khai trương thị trường chứng khoán"],
  ["vn", 2006, "Đăng cai APEC tại Hà Nội"],
  ["vn", 2007, "Trở thành thành viên thứ 150 của WTO"],
  ["vn", 2008, "Lạm phát cao, bất ổn kinh tế vĩ mô"],
  ["vn", 2011, "Ưu tiên kiềm chế lạm phát, tái cơ cấu ngân hàng"],
  ["vn", 2015, "Hình thành Cộng đồng Kinh tế ASEAN (AEC)"],
  ["vn", 2018, "Ký CPTPP (có hiệu lực từ 1/2019)"],
  ["vn", 2020, "EVFTA có hiệu lực; tăng trưởng GDP chậm lại do COVID-19"],
  ["vn", 2021, "Đợt dịch Delta, GDP tăng thấp nhất trong nhiều thập kỷ"],
  ["vn", 2022, "GDP tăng 8,12%, cao nhất trong giai đoạn 2011–2025"],
  ["vn", 2023, "Nâng cấp quan hệ với Mỹ; thị trường bất động sản và trái phiếu khó khăn"],
  ["vn", 2024, "GDP tăng 7,09%"],
  ["vn", 2025, "GDP tăng 8,02%; Nghị quyết 68 về kinh tế tư nhân; đàm phán thuế đối ứng với Mỹ"],
  ["vn", 2026, "GDP quý III tăng 9,95% (sơ bộ); mục tiêu tăng trưởng hai con số"],
  ["wd", 1987, "Chứng khoán Mỹ sụp đổ ngày Thứ Hai Đen"],
  ["wd", 1989, "Bức tường Berlin sụp đổ"],
  ["wd", 1991, "Liên Xô tan rã"],
  ["wd", 1992, "Ký Hiệp ước Maastricht, mở đường cho đồng euro"],
  ["wd", 1994, "NAFTA có hiệu lực"],
  ["wd", 1995, "Tổ chức Thương mại Thế giới (WTO) ra đời"],
  ["wd", 1997, "Khủng hoảng tài chính châu Á bắt đầu từ Thái Lan"],
  ["wd", 1999, "Đồng euro ra đời"],
  ["wd", 2000, "Bong bóng dot-com đạt đỉnh rồi vỡ"],
  ["wd", 2001, "Trung Quốc gia nhập WTO"],
  ["wd", 2008, "Lehman Brothers phá sản, khủng hoảng tài chính toàn cầu"],
  ["wd", 2010, "Khủng hoảng nợ công châu Âu bùng phát"],
  ["wd", 2016, "Anh trưng cầu ý dân rời EU (Brexit)"],
  ["wd", 2018, "Thương chiến Mỹ–Trung leo thang"],
  ["wd", 2020, "COVID-19 gây suy giảm kinh tế toàn cầu"],
  ["wd", 2022, "Lạm phát cao, Fed tăng lãi suất, xung đột Nga–Ukraine"],
  ["wd", 2023, "Sụp đổ Silicon Valley Bank gây rúng động ngân hàng"],
  ["wd", 2025, "Mỹ công bố thuế đối ứng trên diện rộng"],
];

export const ECO_N: Record<number, string> = {
  1986: "Việt Nam bước vào Đổi Mới đúng lúc khối Xô-viết suy yếu; sau 1989–1991 phải chuyển hướng thương mại sang thị trường mới.",
  1995: "Gia nhập ASEAN và bình thường hóa với Mỹ trùng năm WTO ra đời: hai bước hội nhập mở đường cho mô hình xuất khẩu.",
  1997: "Khủng hoảng châu Á: nền tài chính Việt Nam mở ít nên ít bị sốc trực tiếp, nhưng đầu tư nước ngoài và tăng trưởng chậm lại.",
  2007: "Gia nhập WTO đúng lúc vốn toàn cầu dồi dào: FDI và tín dụng tăng nhanh, tạo áp lực lạm phát năm 2008.",
  2008: "Khủng hoảng toàn cầu chồng lên bất ổn vĩ mô trong nước; Việt Nam phải ưu tiên ổn định thay vì tăng trưởng.",
  2020: "Thế giới suy giảm vì COVID-19; Việt Nam vẫn tăng trưởng dương, đồng thời EVFTA bắt đầu có hiệu lực.",
  2025: "Thuế đối ứng của Mỹ gây áp lực lên xuất khẩu, nhưng GDP Việt Nam vẫn tăng khoảng 8%.",
};

export const ECO_KEYS = [1986, 1995, 1997, 2007, 2008, 2020, 2025];
