import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown, ChevronRight, ArrowRight, RotateCcw, CheckCircle2,
  GitBranch, Moon, Sun, Target, Layers, Coins, Building2, Heart,
  BookOpen, TrendingUp, Shield, Star,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────

const concepts = [
  {
    id: "kttt",
    title: "Kinh tế thị trường",
    short: "KTTT",
    gradient: "from-blue-600 to-blue-800",
    icon: <TrendingUp className="w-5 h-5" />,
    content:
      "Nền kinh tế vận hành theo cơ chế thị trường, chịu sự chi phối của quy luật giá trị, cung – cầu và cạnh tranh. Các chủ thể được tự chủ sản xuất, kinh doanh theo pháp luật.",
  },
  {
    id: "combined",
    title: "KTTT định hướng XHCN",
    short: "Mô hình Việt Nam",
    gradient: "from-amber-500 to-yellow-500",
    icon: <Star className="w-5 h-5" />,
    content:
      "Nền kinh tế vận hành đầy đủ theo quy luật thị trường, có sự quản lý của Nhà nước pháp quyền XHCN, nhằm mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Gắn tăng trưởng kinh tế với tiến bộ và công bằng xã hội, phát triển bền vững, bảo vệ môi trường.",
  },
  {
    id: "phapluat",
    title: "Cơ sở pháp lý",
    short: "Hiến pháp 2013",
    gradient: "from-emerald-600 to-teal-700",
    icon: <BookOpen className="w-5 h-5" />,
    content:
      "Điều 51 Hiến pháp 2013: Kinh tế nhà nước giữ vai trò chủ đạo. Kinh tế tư nhân là một trong những động lực quan trọng. Các thành phần kinh tế bình đẳng trước pháp luật.",
  },
];

const characteristics = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Mục tiêu",
    desc: "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Gắn tăng trưởng với tiến bộ xã hội.",
    cls: "border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
    iconCls: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Sở hữu đa dạng",
    desc: "Nhiều hình thức sở hữu cùng tồn tại. Kinh tế nhà nước chủ đạo, kinh tế tư nhân là động lực.",
    cls: "border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200",
    iconCls: "bg-amber-100 dark:bg-amber-900/40",
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Phân phối",
    desc: "Phân phối theo kết quả lao động và hiệu quả kinh tế, kết hợp an sinh xã hội.",
    cls: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-200",
    iconCls: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Quản lý Nhà nước",
    desc: "Nhà nước quản lý bằng pháp luật, chiến lược, quy hoạch và các chính sách kinh tế vĩ mô.",
    cls: "border-purple-200 bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-200",
    iconCls: "bg-purple-100 dark:bg-purple-900/40",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Kinh tế – Xã hội",
    desc: "Phát triển kinh tế gắn với tiến bộ xã hội. Không đánh đổi môi trường hay an sinh xã hội.",
    cls: "border-rose-200 bg-rose-50 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-200",
    iconCls: "bg-rose-100 dark:bg-rose-900/40",
  },
];

const sectors = {
  state: {
    emoji: "🏛",
    title: "Kinh tế Nhà nước",
    subtitle: "Chủ đạo",
    gradient: "from-blue-700 to-blue-900",
    border: "border-blue-200 dark:border-blue-800",
    roles: [
      "Dẫn dắt, điều tiết nền kinh tế",
      "Đảm bảo ổn định kinh tế vĩ mô",
      "Cung cấp dịch vụ công thiết yếu",
      "Đảm bảo an ninh quốc gia",
    ],
    pros: ["Định hướng chiến lược dài hạn", "Phục vụ lợi ích cộng đồng", "Kiểm soát các ngành then chốt"],
    cons: ["Hiệu quả hoạt động còn hạn chế", "Quản trị cần cải thiện", "Cần tiếp tục đổi mới DNNN"],
  },
  private: {
    emoji: "🏢",
    title: "Kinh tế Tư nhân",
    subtitle: "Động lực",
    gradient: "from-amber-500 to-orange-600",
    border: "border-amber-200 dark:border-amber-800",
    roles: [
      "Đóng góp lớn vào GDP quốc gia",
      "Tạo hàng triệu việc làm",
      "Thúc đẩy đổi mới sáng tạo",
      "Nâng cao năng lực cạnh tranh",
    ],
    pros: ["Năng động, linh hoạt, hiệu quả", "Tiên phong ứng dụng công nghệ", "Phản ứng nhanh với thị trường"],
    cons: ["Ưu tiên lợi nhuận ngắn hạn", "Cần giám sát chặt chẽ", "Có thể bỏ qua lợi ích xã hội"],
  },
};

const csrData = {
  state: [
    { icon: "📊", label: "Ổn định vĩ mô", desc: "Kiểm soát lạm phát, đảm bảo các cân đối lớn của nền kinh tế" },
    { icon: "🏥", label: "Y tế công cộng", desc: "Đầu tư bệnh viện, dịch vụ y tế thiết yếu cho nhân dân" },
    { icon: "🏫", label: "Giáo dục", desc: "Mạng lưới hơn 40.000 trường công lập toàn quốc" },
    { icon: "🛣", label: "Hạ tầng", desc: "Giao thông, điện nước, kết nối vùng miền" },
    { icon: "🌄", label: "Vùng sâu vùng xa", desc: "Xóa đói giảm nghèo, thu hẹp khoảng cách phát triển" },
  ],
  private: [
    { icon: "💼", label: "Tạo việc làm", desc: "Hàng triệu việc làm, nâng cao thu nhập người dân" },
    { icon: "📋", label: "Đóng thuế", desc: "Đóng góp ngân sách nhà nước, tuân thủ pháp luật" },
    { icon: "🌱", label: "Môi trường", desc: "Bảo vệ môi trường, phát triển bền vững" },
    { icon: "🔬", label: "Đổi mới sáng tạo", desc: "Tiên phong công nghệ mới, nâng cao năng suất" },
    { icon: "❤️", label: "Thiện nguyện", desc: "Quỹ cộng đồng, hỗ trợ thiên tai, an sinh xã hội" },
  ],
};

const vingroupItems = [
  {
    id: "vinmec",
    label: "Vinmec",
    icon: "🏥",
    title: "Hệ thống Y tế Phi lợi nhuận",
    content:
      "Năm 2016, Vinmec chuyển sang mô hình phi lợi nhuận. 100% lợi nhuận tái đầu tư vào nâng cấp cơ sở, đào tạo nhân lực. Tài trợ 300 tỷ đồng phẫu thuật miễn phí cho bệnh nhân nghèo và người có công.",
    link: "https://dantri.com.vn/doi-song/vingroup-tai-tro-300-ty-dong-phau-thuat-tu-thien-cho-cac-doi-tuong-chinh-sach-20161017144648306.htm",
  },
  {
    id: "vinschool",
    label: "Vinschool",
    icon: "🏫",
    title: "Hệ thống Giáo dục",
    content:
      "Hàng chục cơ sở trên cả nước. Học bổng 50–100% cho học sinh nghèo vượt khó và tài năng. Quỹ Thiện Tâm xây điểm trường kiên cố tại Sơn La, Hà Giang, Mù Căng Chải hoàn toàn miễn phí.",
    link: "https://nhandan.vn/chuyen-vinmec-vinschool-sang-mo-hinh-phi-loi-nhuan-post273782.html",
  },
  {
    id: "vinuni",
    label: "VinUni",
    icon: "🎓",
    title: "Đại học VinUni",
    content:
      "Đại học phi lợi nhuận đẳng cấp quốc tế. Học bổng tinh hoa hàng năm từ 50% đến toàn phần. 100% lợi nhuận tái đầu tư vào nghiên cứu khoa học và đào tạo nhân tài.",
    link: "https://nhandan.vn/chuyen-vinmec-vinschool-sang-mo-hinh-phi-loi-nhuan-post273782.html",
  },
  {
    id: "thientam",
    label: "Quỹ Thiện Tâm",
    icon: "❤️",
    title: "Quỹ Từ thiện Thiện Tâm",
    content:
      "Xây hàng trăm điểm trường kiên cố tại vùng sâu thay thế lớp vách tre. Hỗ trợ thiên tai, đồng bào dân tộc thiểu số. Chương trình an sinh xã hội toàn diện trên cả nước.",
    link: "https://chungta.vn/van-hoa/quy-nha-f-xay-moi-4-ngoi-truong-cho-hoc-sinh-vung-cao-1134056.html",
  },
];

const viettelItems = [
  {
    icon: "📡",
    label: "Phủ sóng biên giới",
    content:
      "Đầu tư hàng trăm tỷ đồng xây trạm BTS tại vùng sâu, đồn biên phòng. Nhiều trạm lỗ vốn kinh tế nhưng vẫn duy trì theo phương châm: \"Ở đâu có dân, có bộ đội — ở đó phải có sóng Viettel.\"",
    link: "https://www.google.com/search?q=https://www.qdnd.vn/kinh-te/cac-van-de/bai-2-nhoc-nhan-cong-song-toi-vung-bien-ti%E1%BA%BFp-theo-va-het-644922&authuser=1",
  },
  {
    icon: "🏫",
    label: "Internet trường học",
    content:
      "Từ 2008, cung cấp internet miễn phí tốc độ cao cho gần 46.000 cơ sở giáo dục. Đưa Việt Nam thành quốc gia phủ sóng 100% trường học chỉ sau 3 năm triển khai.",
    link: "https://tuoitre.vn/cau-noi-viettel-xay-nen-giac-mo-giao-duc-khong-bien-gioi-20241128065157227.htm",
  },
  {
    icon: "🪖",
    label: "Quốc phòng & An ninh",
    content:
      "Bản chất sở hữu toàn dân quy định mục đích cốt lõi: phục vụ quốc phòng, an ninh và an sinh xã hội — không đơn thuần tối đa hóa lợi nhuận kinh tế.",
    link: "https://www.google.com/search?q=https://www.qdnd.vn/kinh-te/cac-van-de/bai-2-nhoc-nhan-cong-song-toi-vung-bien-ti%E1%BA%BFp-theo-va-het-644922&authuser=1",
  },
];

const cycleSteps = [
  { icon: "💰", label: "Lợi nhuận", desc: "Kinh doanh hiệu quả tạo nguồn lực tài chính dồi dào" },
  { icon: "💡", label: "Có nguồn lực", desc: "Tích lũy đủ tiền để thực hiện trách nhiệm xã hội" },
  { icon: "🤝", label: "Thực hiện TNXH", desc: "Đầu tư giáo dục, y tế, cộng đồng, môi trường" },
  { icon: "⭐", label: "Uy tín thương hiệu", desc: "Xây dựng niềm tin từ người dân và xã hội" },
  { icon: "🏛", label: "Môi trường ổn định", desc: "Chính trị – xã hội an toàn, thuận lợi cho kinh doanh" },
  { icon: "📈", label: "Phát triển bền vững", desc: "Tăng trưởng dài hạn → lợi nhuận cao hơn → vòng lặp" },
];

const decisionSteps = [
  { text: "Doanh nghiệp tư nhân", type: "root" },
  { text: "Có mục tiêu lợi nhuận?", type: "question" },
  { text: "Chịu sự quản lý của Nhà nước?", type: "question" },
  { text: "Đóng thuế đầy đủ theo pháp luật?", type: "question" },
  { text: "Tạo việc làm cho người lao động?", type: "question" },
  { text: "Bảo vệ môi trường, đạo đức kinh doanh?", type: "question" },
  { text: "Đầu tư vào giáo dục, y tế, xã hội?", type: "question" },
  { text: "Góp phần thực hiện mục tiêu XHCN ✓", type: "result" },
];

const quizData = [
  {
    q: "Nền KTTT định hướng XHCN ở Việt Nam được quy định tại đâu?",
    opts: ["Luật Doanh nghiệp 2020", "Điều 51 Hiến pháp 2013", "Nghị quyết Đại hội XII", "Bộ luật Dân sự 2015"],
    ans: 1,
    explain: "Điều 51 Hiến pháp 2013 quy định rõ nền kinh tế Việt Nam là KTTT định hướng XHCN với nhiều hình thức sở hữu.",
  },
  {
    q: "Trong nền KTTT định hướng XHCN, kinh tế tư nhân có vai trò gì?",
    opts: ["Giữ vai trò chủ đạo", "Không được khuyến khích phát triển", "Là một trong những động lực quan trọng", "Chỉ hoạt động ở lĩnh vực nhỏ lẻ"],
    ans: 2,
    explain: "Kinh tế tư nhân là một trong những ĐỘNG LỰC quan trọng. Kinh tế nhà nước mới giữ vai trò chủ đạo.",
  },
  {
    q: "Năm 2016, Vingroup chuyển Vinmec và Vinschool sang mô hình nào?",
    opts: ["Cổ phần hóa toàn bộ", "Phi lợi nhuận", "Liên doanh với nước ngoài", "Tư nhân hóa hoàn toàn"],
    ans: 1,
    explain: "Vingroup cam kết dành 100% lợi nhuận từ 2 hệ thống này để tái đầu tư, không chia cổ tức cho cổ đông.",
  },
  {
    q: "Viettel triển khai chương trình Internet trường học từ năm nào?",
    opts: ["2005", "2006", "2008", "2010"],
    ans: 2,
    explain: "Từ năm 2008, Viettel cung cấp internet miễn phí cho gần 46.000 cơ sở giáo dục, đưa VN đạt 100% phủ sóng.",
  },
  {
    q: "Mối quan hệ giữa lợi nhuận và TNXH trong KTTT định hướng XHCN là gì?",
    opts: ["Hoàn toàn đối lập nhau", "Lợi nhuận quan trọng hơn TNXH", "Không có mối liên hệ gì", "Không loại trừ mà làm tiền đề cho nhau"],
    ans: 3,
    explain: "Lợi nhuận tạo nguồn lực cho TNXH. TNXH xây dựng uy tín, ổn định môi trường, từ đó tăng lợi nhuận bền vững.",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-400 px-3 py-1 rounded-full mb-4">
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      {children}
    </h2>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────

const NAV_SECTIONS = ["Hero", "Khái niệm", "Đặc trưng", "Thành phần", "TNXH", "Case Study", "Profit/CSR", "Quyết định", "Tổng kết"];

function Navbar({ active }: { active: number }) {
  const [pct, setPct] = useState(0);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-5 h-13 flex items-center justify-between gap-4 py-3">
        <span
          className="text-sm font-bold text-blue-800 dark:text-blue-300 tracking-tight shrink-0"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          KTTT · XHCN
        </span>
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
          {NAV_SECTIONS.map((s, i) => (
            <button
              key={i}
              title={s}
              onClick={() =>
                document.getElementById(`sec-${i}`)?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-2 h-2 rounded-full transition-all duration-300 shrink-0 ${i === active ? "bg-blue-700 scale-125" : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tabular-nums w-8 text-right">
            {Math.round(pct)}%
          </span>
          <button
            onClick={() => setDark(!dark)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-slate-100 dark:bg-slate-800">
        <div className="h-full bg-blue-700 transition-all duration-150" style={{ width: `${pct}%` }} />
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="sec-0"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_60%,rgba(30,58,138,0.5),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(250,204,21,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_60%_85%,rgba(16,185,129,0.07),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-amber-400 border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 rounded-full mb-10">
            Triết học Mác – Lênin · Bài thuyết trình nhóm
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
        >
          Kinh tế <span className="text-amber-400">Tư nhân</span>
          <br />
          <span className="text-blue-400">trong nền KTTT</span>
          <br />
          <span className="text-slate-400" style={{ fontSize: "0.68em" }}>
            định hướng Xã hội Chủ nghĩa
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Phân tích vai trò, trách nhiệm xã hội và minh chứng thực tiễn từ Vingroup & Viettel
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={() => document.getElementById("sec-1")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 mx-auto transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/50"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            Khám phá <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.9 }}>
            <ChevronDown className="w-6 h-6 text-slate-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NETWORK DIAGRAM ──────────────────────────────────────────

const netNodes = [
  { id: "state", label: "Nhà nước", cx: 50, cy: 12, r: 8, fill: "#1E3A8A", desc: "Quản lý bằng pháp luật, chiến lược, quy hoạch. Định hướng và điều tiết nền kinh tế vĩ mô." },
  { id: "enterprise", label: "Doanh nghiệp", cx: 14, cy: 72, r: 8, fill: "#D97706", desc: "Tự chủ sản xuất, kinh doanh. Tạo việc làm, đóng thuế, thực hiện trách nhiệm xã hội." },
  { id: "market", label: "Thị trường", cx: 86, cy: 72, r: 8, fill: "#059669", desc: "Quy luật giá trị, cung – cầu, cạnh tranh. Phân bổ nguồn lực hiệu quả theo tín hiệu thị trường." },
  { id: "people", label: "Người dân", cx: 50, cy: 92, r: 8, fill: "#7C3AED", desc: "Mục tiêu cuối cùng: nâng cao đời sống vật chất và tinh thần — trung tâm của định hướng XHCN." },
];
const netEdges = [
  [50, 18, 14, 66],
  [50, 18, 86, 66],
  [14, 78, 50, 86],
  [86, 78, 50, 86],
  [20, 72, 80, 72],
];

function NetworkDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const node = netNodes.find((n) => n.id === active);

  return (
    <div className="relative">
      <svg viewBox="0 0 100 105" className="w-full max-w-xs mx-auto block">
        {netEdges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="0.6" strokeDasharray={i === 4 ? "2,2" : undefined} />
        ))}
        {netNodes.map((n) => (
          <g key={n.id} className="cursor-pointer" onClick={() => setActive(active === n.id ? null : n.id)}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={active === n.id ? n.r + 2 : n.r}
              fill={n.fill}
              opacity={active && active !== n.id ? 0.35 : 1}
              className="transition-all duration-300"
            />
            <text x={n.cx} y={n.cy + n.r + 6} textAnchor="middle" fontSize="4.5" fill="#64748B" fontFamily="Inter,sans-serif">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <AnimatePresence>
        {node && (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.92, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            className="absolute inset-x-0 top-full mt-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg text-sm"
          >
            <div className="font-bold mb-1 text-slate-900 dark:text-slate-100" style={{ color: node.fill }}>
              {node.label}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{node.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SECTION 1 — CONCEPTS ────────────────────────────────────

function S1Concepts() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="sec-1" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Section 01 — Khái niệm</Tag>
          <H2>Nền KTTT định hướng XHCN là gì?</H2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Nhấn vào từng card để xem nội dung chi tiết
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            {concepts.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.09}>
                <motion.div
                  onClick={() => setActive(active === i ? null : i)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer rounded-2xl border bg-white dark:bg-slate-800 p-5 transition-all duration-300 ${
                    active === i
                      ? "border-blue-300 dark:border-blue-700 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white mb-3`}
                  >
                    {c.icon}
                  </div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                    {c.short}
                  </div>
                  <div
                    className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    {c.title}
                  </div>
                  <AnimatePresence>
                    {active === i ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed overflow-hidden"
                      >
                        {c.content}
                      </motion.p>
                    ) : (
                      <p className="text-xs text-blue-600 dark:text-blue-400">Nhấn để xem →</p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="flex flex-col items-center pt-4">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-6">
              Quan hệ các chủ thể — nhấn node để xem
            </p>
            <div className="w-full max-w-xs">
              <NetworkDiagram />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 2 — CHARACTERISTICS ─────────────────────────────

function S2Characteristics() {
  return (
    <section id="sec-2" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Section 02 — Đặc trưng</Tag>
          <H2>5 Đặc trưng cơ bản</H2>
          <p className="text-slate-500 dark:text-slate-400">
            Những đặc điểm phân biệt mô hình Việt Nam với KTTT thuần túy
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {characteristics.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                className={`rounded-2xl border p-6 transition-all duration-300 cursor-default ${c.cls}`}
              >
                <div className={`w-12 h-12 ${c.iconCls} rounded-xl flex items-center justify-center mb-4`}>
                  {c.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-80">{c.desc}</p>
              </motion.div>
            </FadeIn>
          ))}

          <FadeIn delay={0.42}>
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 dark:bg-slate-800 dark:border-slate-700 p-6 text-white h-full flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Cơ sở pháp lý
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Điều 51 Hiến pháp 2013: Các thành phần kinh tế bình đẳng, hợp tác và cạnh tranh theo pháp luật.
                </p>
              </div>
              <div className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Hiến pháp CHXHCN Việt Nam · 2013
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 3 — ECONOMIC SECTORS ────────────────────────────

function S3Sectors() {
  const [expanded, setExpanded] = useState<keyof typeof sectors | null>(null);

  return (
    <section id="sec-3" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Section 03 — Thành phần</Tag>
          <H2>Hai thành phần kinh tế</H2>
          <p className="text-slate-500 dark:text-slate-400">Nhấn vào mỗi card để xem đầy đủ vai trò, ưu điểm và hạn chế</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {(Object.keys(sectors) as Array<keyof typeof sectors>).map((key, ki) => {
            const s = sectors[key];
            const open = expanded === key;
            return (
              <FadeIn key={key} delay={ki * 0.12}>
                <motion.div
                  layout
                  onClick={() => setExpanded(open ? null : key)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border bg-white dark:bg-slate-800 transition-all duration-300 ${
                    open ? "shadow-xl" : "shadow-sm hover:shadow-md"
                  } ${s.border}`}
                >
                  <div className={`bg-gradient-to-r ${s.gradient} p-6 text-white`}>
                    <div className="text-4xl mb-2">{s.emoji}</div>
                    <div className="text-xs font-mono bg-white/20 text-white px-2 py-0.5 rounded-full inline-block mb-2">
                      {s.subtitle}
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      {s.title}
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="space-y-2 mb-3">
                      {s.roles.slice(0, open ? 4 : 2).map((r, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          {r}
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mt-2 space-y-3">
                            <div>
                              <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                                Ưu điểm
                              </div>
                              {s.pros.map((p, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 mb-1">
                                  <span className="text-emerald-500 font-bold mt-0.5">+</span>
                                  {p}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">
                                Hạn chế
                              </div>
                              {s.cons.map((c, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 mb-1">
                                  <span className="text-rose-400 font-bold mt-0.5">−</span>
                                  {c}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      {open ? "Thu gọn ↑" : "Xem thêm →"}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4 — CSR ─────────────────────────────────────────

function S4CSR() {
  const [branch, setBranch] = useState<"state" | "private" | null>(null);

  return (
    <section id="sec-4" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Section 04 — TNXH</Tag>
          <H2>Trách nhiệm Xã hội</H2>
          <p className="text-slate-500 dark:text-slate-400">Chọn một thành phần kinh tế để xem trách nhiệm cụ thể</p>
        </FadeIn>

        <div className="flex flex-col items-center">
          <FadeIn>
            <div
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl px-8 py-4 font-bold text-lg shadow-lg"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Trách nhiệm Xã hội (TNXH)
            </div>
          </FadeIn>

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600 mt-4" />

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
            {(["state", "private"] as const).map((key, ki) => {
              const items = csrData[key];
              const label = key === "state" ? "🏛 Kinh tế Nhà nước" : "🏢 Kinh tế Tư nhân";
              const btn =
                key === "state"
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-amber-500 hover:bg-amber-600 text-white";
              const itemCls =
                key === "state"
                  ? "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800"
                  : "bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800";
              const open = branch === key;
              return (
                <FadeIn key={key} delay={ki * 0.1}>
                  <div className="flex flex-col items-center">
                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />
                    <motion.button
                      onClick={() => setBranch(open ? null : key)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`${btn} rounded-xl px-6 py-3 font-semibold text-sm transition-all mb-4 shadow-sm`}
                      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                      {label}
                    </motion.button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="w-full space-y-2"
                        >
                          {items.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: key === "state" ? -16 : 16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.07 }}
                              className={`flex items-start gap-3 p-3 rounded-xl border ${itemCls}`}
                            >
                              <span className="text-xl">{item.icon}</span>
                              <div>
                                <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                                  {item.label}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!open && (
                      <p className="text-xs text-slate-400 dark:text-slate-500">Nhấn để mở rộng</p>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 5 — CASE STUDY ───────────────────────────────────

function S5CaseStudy() {
  const [company, setCompany] = useState<"vingroup" | "viettel">("vingroup");
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="sec-5" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <Tag>Section 05 — Case Study</Tag>
          <H2>Minh chứng thực tiễn</H2>
          <p className="text-slate-500 dark:text-slate-400">Doanh nghiệp tiêu biểu thực hiện định hướng XHCN</p>
        </FadeIn>

        <div className="flex justify-center gap-3 mb-12">
          {(["vingroup", "viettel"] as const).map((c) => (
            <button
              key={c}
              onClick={() => { setCompany(c); setActiveIdx(0); }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                company === c
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300"
              }`}
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              {c === "vingroup" ? "🏗 Vingroup" : "📡 Viettel"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {company === "vingroup" ? (
            <motion.div
              key="ving"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-4">Lĩnh vực hoạt động</p>
                  {vingroupItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveIdx(i)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        activeIdx === i
                          ? "bg-blue-700 border-blue-700 text-white shadow-md"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-200"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-semibold text-sm" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-blue-800 to-blue-950 p-6 text-white">
                        <div className="text-3xl mb-2">{vingroupItems[activeIdx].icon}</div>
                        <h3 className="text-xl font-bold" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                          {vingroupItems[activeIdx].title}
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-sm">
                          {vingroupItems[activeIdx].content}
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                          <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1.5">
                            Minh chứng từ báo chí
                          </div>
                          <a 
                            href={vingroupItems[activeIdx].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed hover:underline break-all"
                          >
                            {vingroupItems[activeIdx].link}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {["Có lợi nhuận ✓", "Có TNXH ✓"].map((badge, i) => (
                      <motion.div
                        key={badge}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.12 }}
                        className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-semibold border border-emerald-200 dark:border-emerald-700"
                      >
                        {badge}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="viettel"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-red-700 to-red-950 p-6 text-white">
                    <div className="text-[10px] font-mono text-red-300 mb-1 tracking-wider uppercase">
                      Doanh nghiệp Nhà nước · Bộ Quốc phòng
                    </div>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      Viettel Group
                    </h3>
                    <p className="text-red-200 text-sm mt-1 italic">
                      "Ở đâu có dân, có bộ đội — ở đó phải có sóng Viettel"
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mb-6">
                  {viettelItems.map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 h-full"
                      >
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h4
                          className="font-bold text-sm mb-3 text-slate-900 dark:text-slate-100"
                          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                          {item.label}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.content}</p>
                      </motion.div>
                    </FadeIn>
                  ))}
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Phủ sóng trên cả nước</p>
                  <div className="relative bg-blue-50 dark:bg-blue-900/10 rounded-xl h-44 overflow-hidden">
                    {[
                      { x: "28%", y: "14%", label: "Hà Nội" },
                      { x: "55%", y: "42%", label: "Đà Nẵng" },
                      { x: "66%", y: "74%", label: "TP.HCM" },
                      { x: "12%", y: "22%", label: "Biên giới" },
                      { x: "82%", y: "58%", label: "Biển đảo" },
                      { x: "18%", y: "58%", label: "Vùng cao" },
                    ].map((dot, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.18, type: "spring" }}
                        style={{ left: dot.x, top: dot.y }}
                        className="absolute flex flex-col items-center"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.6, 1] }}
                          transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.3 }}
                          className="w-3 h-3 rounded-full bg-red-500 shadow-lg"
                        />
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap">
                          {dot.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-5 text-center">
                    {[["46,000+", "Trường học"], ["100%", "Phủ sóng trường học"], ["3 năm", "Hoàn thành"]].map(
                      ([n, l], i) => (
                        <div key={i}>
                          <div
                            className="text-xl font-bold text-blue-700 dark:text-blue-400"
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                          >
                            {n}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{l}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── SECTION 6 — PROFIT vs CSR ───────────────────────────────

function S6ProfitCSR() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % cycleSteps.length), 1700);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="sec-6" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Section 06 — Biện chứng</Tag>
          <H2>Lợi nhuận & Trách nhiệm XH</H2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Mâu thuẫn biện chứng: đối lập nhưng thống nhất — làm tiền đề cho nhau
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <FadeIn className="text-center">
            <div className="inline-flex flex-col items-center">
              <div className="flex items-end gap-6 mb-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="bg-blue-700 text-white rounded-2xl p-5 w-28 text-center shadow-xl shadow-blue-200 dark:shadow-blue-900/30">
                    <div className="text-3xl mb-1">💰</div>
                    <div className="font-bold text-sm" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      Lợi nhuận
                    </div>
                  </div>
                  <div className="w-px h-10 bg-slate-300 dark:bg-slate-600" />
                </motion.div>

                <div className="text-5xl mb-12 text-slate-300 dark:text-slate-600">⚖️</div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="bg-emerald-600 text-white rounded-2xl p-5 w-28 text-center shadow-xl shadow-emerald-200 dark:shadow-emerald-900/30">
                    <div className="text-3xl mb-1">🤝</div>
                    <div className="font-bold text-sm" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      TNXH
                    </div>
                  </div>
                  <div className="w-px h-10 bg-slate-300 dark:bg-slate-600" />
                </motion.div>
              </div>

              <div className="w-px h-10 bg-slate-300 dark:bg-slate-600" />
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600" />
              <p className="text-xs text-slate-400 mt-4">Không đối lập — cùng làm tiền đề</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-5">
                Vòng tuần hoàn tích cực
              </p>
              <div className="space-y-2.5">
                {cycleSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: step === i ? 1 : 0.38,
                      scale: step === i ? 1.02 : 1,
                      x: step === i ? 6 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${
                      step === i
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-semibold text-sm text-slate-800 dark:text-slate-200"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                      >
                        {s.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</div>
                    </div>
                    {i < cycleSteps.length - 1 ? (
                      <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
                    ) : (
                      <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7 — DECISION TREE ───────────────────────────────

function S7Decision() {
  const [revealed, setRevealed] = useState(1);
  return (
    <section id="sec-7" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Section 07 — Kết luận</Tag>
          <H2>Tư nhân có định hướng XHCN?</H2>
          <p className="text-slate-500 dark:text-slate-400">Decision tree — nhấn "Tiếp theo" để khám phá từng bước</p>
        </FadeIn>

        <div className="max-w-lg mx-auto">
          <div className="space-y-3">
            {decisionSteps.slice(0, revealed).map((node, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {i > 0 && i < decisionSteps.length - 1 && (
                  <div className="flex items-center gap-2 mb-3 ml-6">
                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600" />
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                      CÓ ✓
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-2xl border p-4 ${
                    node.type === "root"
                      ? "bg-slate-900 dark:bg-slate-700 border-slate-700 dark:border-slate-600 text-white"
                      : node.type === "result"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-0 text-white shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {node.type === "question" && (
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0">
                        ?
                      </div>
                    )}
                    {node.type === "result" && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                    {node.type === "root" && <GitBranch className="w-4 h-4 text-slate-400 shrink-0" />}
                    <span className="font-semibold text-sm" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      {node.text}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {revealed < decisionSteps.length && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setRevealed((r) => Math.min(r + 1, decisionSteps.length))}
              className="mt-6 w-full py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Tiếp theo <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}

          {revealed >= decisionSteps.length && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setRevealed(1)}
              className="mt-4 w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Xem lại từ đầu
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────

function Quiz() {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizData[cur];

  const pick = (i: number) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    if (i === q.ans) setScore((s) => s + 1);
  };

  const next = () => {
    if (cur < quizData.length - 1) {
      setCur((c) => c + 1);
      setSel(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setCur(0); setSel(null); setAnswered(false); setScore(0); setDone(false); };

  return (
    <section id="sec-8" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <Tag>Quiz — Kiểm tra</Tag>
          <H2>Kiểm tra kiến thức</H2>
          <p className="text-slate-500 dark:text-slate-400">5 câu hỏi trắc nghiệm — bạn đạt được bao nhiêu?</p>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 mb-8">
            {quizData.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < cur ? "bg-emerald-500" : i === cur ? "bg-blue-700" : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>

          {!done ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={cur}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
              >
                <div className="bg-blue-700 p-6 text-white">
                  <div className="text-[10px] font-mono text-blue-300 mb-2 tracking-widest uppercase">
                    Câu {cur + 1} / {quizData.length}
                  </div>
                  <p className="font-semibold text-lg leading-snug" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    {q.q}
                  </p>
                </div>
                <div className="p-5 space-y-3">
                  {q.opts.map((opt, i) => {
                    const isCorrect = i === q.ans;
                    const isSelected = i === sel;
                    let cls = "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20";
                    if (answered) {
                      if (isCorrect) cls = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-700";
                      else if (isSelected) cls = "bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700";
                      else cls = "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 opacity-50";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                            answered && isCorrect
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : answered && isSelected && !isCorrect
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-slate-300 dark:border-slate-500 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {answered && isCorrect ? "✓" : answered && isSelected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-slate-700 dark:text-slate-200">{opt}</span>
                      </button>
                    );
                  })}

                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4"
                      >
                        <div className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1.5">
                          Giải thích
                        </div>
                        <p className="text-sm text-amber-800 dark:text-amber-300">{q.explain}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {answered && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={next}
                      className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {cur < quizData.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 shadow-sm">
                <div className="text-7xl mb-5">{score === 5 ? "🏆" : score >= 3 ? "🎉" : "📚"}</div>
                <h3
                  className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2"
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  {score} / {quizData.length}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  {score === 5
                    ? "Xuất sắc! Bạn nắm vững toàn bộ nội dung."
                    : score >= 3
                    ? "Tốt lắm! Hãy ôn lại những câu còn sai."
                    : "Hãy xem lại bài và thử lại nhé!"}
                </p>
                <div className="flex justify-center gap-3 mb-8">
                  {Array.from({ length: quizData.length }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        i < score
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
                          : "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-700"
                      }`}
                    >
                      {i < score ? "✓" : "✗"}
                    </div>
                  ))}
                </div>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 mx-auto text-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Làm lại
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── SUMMARY ─────────────────────────────────────────────────

const summaryItems = [
  { icon: "🔑", label: "KTTT", desc: "Vận hành theo quy luật giá trị, cung – cầu, cạnh tranh", color: "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
  { icon: "📋", label: "5 Đặc trưng", desc: "Mục tiêu · Sở hữu · Phân phối · Quản lý · KT-XH", color: "border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-900 dark:text-amber-100" },
  { icon: "🏛", label: "Kinh tế Nhà nước", desc: "Chủ đạo — dẫn dắt, điều tiết, dịch vụ công", color: "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
  { icon: "🏢", label: "Kinh tế Tư nhân", desc: "Động lực — GDP, việc làm, đổi mới sáng tạo", color: "border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 text-orange-900 dark:text-orange-100" },
  { icon: "🤝", label: "TNXH", desc: "NN ổn định vĩ mô · TN tạo việc làm, thuế, môi trường", color: "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100" },
  { icon: "🏗", label: "Vingroup", desc: "Phi lợi nhuận → Tái đầu tư → TNXH", color: "border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800 text-purple-900 dark:text-purple-100" },
  { icon: "📡", label: "Viettel", desc: "Quốc phòng + Phủ sóng + Internet trường học miễn phí", color: "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-900 dark:text-red-100" },
];

function Summary() {
  return (
    <section id="sec-9" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <Tag>Tổng kết</Tag>
          <H2>Infographic Tổng quan</H2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14">
          {summaryItems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`rounded-2xl border p-5 h-full transition-all cursor-default ${item.color}`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-sm mb-1.5" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {item.label}
                </div>
                <div className="text-xs leading-relaxed opacity-70">{item.desc}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-2xl px-8 py-7 max-w-2xl text-center shadow-2xl shadow-blue-200 dark:shadow-blue-950">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-3 font-mono">
              Kết luận
            </div>
            <p
              className="font-semibold text-lg leading-relaxed"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Doanh nghiệp tư nhân{" "}
              <span className="text-amber-400">không mang bản chất XHCN</span>, nhưng dưới sự định hướng
              của Nhà nước, họ{" "}
              <span className="text-emerald-400">góp phần thực hiện các mục tiêu XHCN</span> thông qua
              việc làm, thuế, TNXH và phát triển bền vững.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          KTTT · XHCN
        </div>
        <p className="text-sm mb-1">Triết học Mác – Lênin · Bài thuyết trình nhóm</p>
        <p className="text-xs text-slate-600 mt-4">
          Kinh tế Tư nhân trong nền Kinh tế Thị trường Định hướng Xã hội Chủ nghĩa
        </p>
        <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-600">
          Vingroup · Viettel · Hiến pháp 2013 · Điều 51 · Đại hội XIII Đảng CSVN
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.id.replace("sec-", ""));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    for (let i = 0; i < NAV_SECTIONS.length; i++) {
      const el = document.getElementById(`sec-${i}`);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar active={activeSection} />
      <main className="pt-[53px]">
        <Hero />
        <S1Concepts />
        <S2Characteristics />
        <S3Sectors />
        <S4CSR />
        <S5CaseStudy />
        <S6ProfitCSR />
        <S7Decision />
        <Summary />
        <Footer />
      </main>
    </div>
  );
}
