const channels = {
  all: "すべての案件",
  jobs: "案件",
  saved: "保存済み",
  guide: "はじめてガイド",
  qa: "質問・相談",
  ai: "AI相談ルーム",
};

const priceTiers = {
  all: { label: "すべての価格帯", min: 0, max: Infinity },
  under15000: { label: "〜15,000円", min: 0, max: 14999 },
  middle15000: { label: "15,000〜19,999円", min: 15000, max: 19999 },
  over20000: { label: "20,000円以上", min: 20000, max: Infinity },
};

const categories = {
  all: "すべて",
  inspection: "検品・梱包",
  typing: "データ入力",
  creative: "画像チェック",
};

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const jobs = [
  {
    id: 1,
    channel: "inspection",
    company: "白樺文具株式会社",
    logo: "白",
    color: "#f0b84b",
    title: "封入作業 300セット",
    description:
      "案内チラシと返信用封筒を1セットにまとめる作業です。資材は宅配でお届け、完了後は着払いで返送できます。",
    pay: "12,000円",
    due: "5月2日",
    place: "完全在宅・資材配送",
    slots: "あと4名",
    time: "約6時間",
    review: "写真提出後24時間以内",
    trust: "本人確認済み・発注実績 128件",
    badge: "未経験OK",
    tags: ["beginner", "remote"],
    posted: "10:24",
  },
  {
    id: 2,
    channel: "typing",
    company: "北浜リサーチ",
    logo: "北",
    color: "#58a9df",
    title: "アンケート結果のデータ入力 1,200件",
    description:
      "紙アンケート画像を見ながら、指定フォーマットへ入力します。入力マニュアルとチェックシートがあります。",
    pay: "21,600円",
    due: "5月6日",
    place: "完全在宅",
    slots: "あと2名",
    time: "約10時間",
    review: "納品後48時間以内",
    trust: "支払い完了率 99%・継続依頼あり",
    badge: "入力経験歓迎",
    tags: ["remote"],
    posted: "09:48",
  },
  {
    id: 3,
    channel: "creative",
    company: "Nami EC Studio",
    logo: "N",
    color: "#e8868a",
    title: "商品画像のNGチェック 800枚",
    description:
      "EC掲載前の商品画像を確認し、ぼやけ・文字切れ・背景不備を分類します。専門ソフトは不要です。",
    pay: "16,000円",
    due: "本日 20:00",
    place: "完全在宅",
    slots: "あと6名",
    time: "約5時間",
    review: "提出後12時間以内",
    trust: "本人確認済み・発注実績 74件",
    badge: "今日まで",
    tags: ["remote", "urgent", "beginner"],
    posted: "09:12",
  },
  {
    id: 4,
    channel: "inspection",
    company: "青葉ギフト",
    logo: "青",
    color: "#48b58c",
    title: "ギフト箱の組み立て 200個",
    description:
      "折り目に沿って箱を組み立て、緩衝材を同梱します。作業動画を見ながら進められます。",
    pay: "14,800円",
    due: "5月4日",
    place: "在宅・資材配送",
    slots: "あと3名",
    time: "約7時間",
    review: "到着検品後24時間以内",
    trust: "支払い完了率 97%",
    badge: "資材配送",
    tags: ["beginner"],
    posted: "昨日 18:40",
  },
  {
    id: 5,
    channel: "typing",
    company: "Mori Accounting",
    logo: "M",
    color: "#b9a7ff",
    title: "領収書の項目チェック 600枚",
    description:
      "日付・金額・店舗名が読めるか確認し、CSVの不備箇所に印を付ける案件です。経理知識は不要です。",
    pay: "13,200円",
    due: "5月3日",
    place: "完全在宅",
    slots: "あと1名",
    time: "約4時間",
    review: "提出後24時間以内",
    trust: "法人確認済み・発注実績 211件",
    badge: "即日開始",
    tags: ["remote", "beginner", "urgent"],
    posted: "昨日 16:05",
  },
];

let activeChannel = "all";
let activePriceTier = "all";
let activeCategory = "all";
let activeFilter = "all";
let selectedJobId = jobs[0].id;
let isLoggedIn = false;
let emailVerified = false;
let profileSubmitted = false;
let idSubmitted = false;
let idImages = { front: null, back: null, face: null };
let contractIssued = false;
let lineRegistered = false;
let vuzzApplicationSubmitted = false;
let identityVerified = false;
const loginRecordDays = new Set();
let completedJobCount = 0;
let isEditingProfile = false;
let profileFormStep = 1;
let workerAuthEmail = "";
const profileData = {
  lastName: "",
  firstName: "",
  kanaLast: "",
  kanaFirst: "",
  birthdate: "",
  gender: "",
  postalCode: "",
  prefecture: "",
  addressLine1: "",
  addressLine2: "",
  username: "",
  phone: "",
  address: "",
  workHistory: "",
  avatarUrl: "",
};
const companyData = {
  companyName: "",
  representativeName: "",
  contactName: "",
  contactPhone: "",
  companyPostalCode: "",
  companyAddress: "",
  companyHistory: "",
};
let companyProfileSubmitted = false;
let pendingLoginRole = null;
let pendingLoginMethod = null;
const savedJobs = new Set();
const applications = [];
const bankData = { bankName: "", branchName: "", accountType: "普通", accountNumber: "", holderName: "" };
let bankSubmitted = false;
let isBankEditing = false;
let isProfileCardEditing = false;
let workerPassword = "";
let isVuzzLoggedIn = false;
const vuzzAdminCredentials = { email: "admin@vuzz.jp", password: "vuzz2026" };
const COMPANY_ACCOUNTS_STORAGE_KEY = "homeworks_company_accounts";
const companyAccounts = loadCompanyAccounts();
let currentCompanyAccount = null;
const registeredWorkers = [
  {
    email: "tanaka.yui@example.com",
    lastName: "田中",
    firstName: "結衣",
    kanaLast: "タナカ",
    kanaFirst: "ユイ",
    username: "yui_t",
    birthdate: "1998-07-14",
    gender: "女性",
    postalCode: "1500001",
    prefecture: "東京都",
    addressLine1: "渋谷区神宮前1-2-3",
    addressLine2: "グリーンハイツ201",
    registeredAt: "2026/04/28 10:23:05",
    emailVerified: true,
    idSubmitted: false,
    idImages: { front: null, back: null, face: null },
    approved: true,
  },
  {
    email: "sato.kenji@example.com",
    lastName: "佐藤",
    firstName: "健二",
    kanaLast: "サトウ",
    kanaFirst: "ケンジ",
    username: "kenji_s",
    birthdate: "1991-03-22",
    gender: "男性",
    postalCode: "5300001",
    prefecture: "大阪府",
    addressLine1: "北区梅田2-4-9",
    addressLine2: "大阪ビル305",
    registeredAt: "2026/04/28 14:07:42",
    emailVerified: true,
    idSubmitted: false,
    idImages: { front: null, back: null, face: null },
    approved: false,
  },
  {
    email: "yamamoto.rin@example.com",
    lastName: "山本",
    firstName: "凛",
    kanaLast: "ヤマモト",
    kanaFirst: "リン",
    username: "rin_y",
    birthdate: "2001-11-05",
    gender: "女性",
    postalCode: "2200012",
    prefecture: "神奈川県",
    addressLine1: "横浜市西区みなとみらい3-6-1",
    addressLine2: "",
    registeredAt: "2026/04/29 09:15:30",
    emailVerified: false,
    idSubmitted: false,
    idImages: { front: null, back: null, face: null },
    approved: false,
  },
  {
    email: "ito.haruki@example.com",
    lastName: "伊藤",
    firstName: "春樹",
    kanaLast: "イトウ",
    kanaFirst: "ハルキ",
    username: "haruki_i",
    birthdate: "1995-08-30",
    gender: "男性",
    postalCode: "4600008",
    prefecture: "愛知県",
    addressLine1: "名古屋市中区栄4-1-2",
    addressLine2: "栄センタービル108",
    registeredAt: "2026/04/29 18:44:11",
    emailVerified: true,
    idSubmitted: false,
    idImages: { front: null, back: null, face: null },
    approved: false,
  },
  {
    email: "nakamura.moe@example.com",
    lastName: "中村",
    firstName: "萌",
    kanaLast: "ナカムラ",
    kanaFirst: "モエ",
    username: "moe_n",
    birthdate: "2000-02-18",
    gender: "女性",
    postalCode: "8100001",
    prefecture: "福岡県",
    addressLine1: "福岡市中央区天神1-10-5",
    addressLine2: "",
    registeredAt: "2026/04/30 08:02:59",
    emailVerified: false,
    idSubmitted: false,
    idImages: { front: null, back: null, face: null },
    approved: false,
  },
];
const withdrawalHistory = [];
let withdrawalPending = false;
let pendingLogoutButton = null;
let feedNotice = "";

const feed = document.querySelector("#jobFeed");
const channelTitle = document.querySelector("#channelTitle");
const feedTitle = document.querySelector("#feedTitle");
const feedIntroText = document.querySelector("#feedIntroText");
const searchInput = document.querySelector("#searchInput");
const allJobsCount = document.querySelector("#allJobsCount");
const saveCurrent = document.querySelector("#saveCurrent");
const savedCount = document.querySelector("#savedCount");
const postModal = document.querySelector("#postModal");
const logoutModal = document.querySelector("#logoutModal");
const workerMainGrid = document.querySelector("#workerApp .main-grid");
const filterRow = document.querySelector("#workerApp .filter-row");
const channelComposer = document.querySelector("#channelComposer");
const channelMessageInput = document.querySelector("#channelMessageInput");
const openMyPageButton = document.querySelector("#openMyPage");
const workerAvatar = document.querySelector("#workerAvatar");
const workerNameText = document.querySelector("#workerNameText");
const workerIdentityText = document.querySelector("#workerIdentityText");
const workerRankText = document.querySelector("#workerRankText");
const workerPresence = document.querySelector("#workerPresence");
const aiRoomButton = document.querySelector("#aiRoomButton");
const notificationsButton = document.querySelector("#notificationsButton");
const settingsButton = document.querySelector("#settingsButton");
const utilityPopover = document.querySelector("#utilityPopover");
const vuzzTitle = document.querySelector("#vuzzTitle");
const vuzzSubtitle = document.querySelector("#vuzzSubtitle");
const vuzzNoticeTitle = document.querySelector("#vuzzNoticeTitle");
const vuzzNoticeText = document.querySelector("#vuzzNoticeText");
const vuzzMetrics = document.querySelector("#vuzzMetrics");
const vuzzContent = document.querySelector("#vuzzContent");
const loginView = document.querySelector("#loginView");
const appViews = {
  worker: document.querySelector("#workerApp"),
  company: document.querySelector("#companyApp"),
  vuzz: document.querySelector("#vuzzApp"),
};
const writableChannels = new Set(["qa", "ai"]);
const supportChannels = new Set(["guide", "qa", "ai"]);
const supportMessages = [
  {
    author: "運営サポート",
    avatar: "運",
    color: "#48b58c",
    time: "10:02",
    title: "応募前の不安はここで相談できます",
    body: "案件内容、納期、資材配送、報酬の確認など、公開チャンネルで質問できます。",
  },
  {
    author: "佐藤 美咲",
    avatar: "美",
    color: "#58a9df",
    time: "10:18",
    title: "資材配送の案件は送料がかかりますか？",
    body: "応募前に確認したいです。返送時の送料も企業負担か知りたいです。",
  },
  {
    author: "運営サポート",
    avatar: "運",
    color: "#48b58c",
    time: "10:20",
    title: "送料は案件詳細の条件を確認してください",
    body: "資材配送ありの案件は、詳細欄に配送・返送条件を表示しています。不明な場合は企業へ質問できます。",
  },
];
const aiMessages = [
  {
    author: "運営AI",
    avatar: "AI",
    color: "#b9a7ff",
    time: "固定",
    title: "相談内容を入力してください",
    body: "案件選び、応募前の確認、本人認証、納期や報酬の不安などをここで相談できます。",
  },
];
const vuzzChannels = {
  review: {
    title: "案件審査",
    subtitle: "企業が投稿した案件の安全性と条件を確認",
    noticeTitle: "案件審査キュー",
    noticeText: "報酬、納期、作業内容、個人情報の扱いを確認して承認します",
    metrics: [
      ["9", "審査待ち"],
      ["3", "差戻し候補"],
      ["14h", "平均承認時間"],
    ],
    heading: "案件審査キュー",
    eyebrow: "review queue",
    healthTitle: "審査基準",
    rows: [
      ["warn", "ラベル貼り 500枚", "白樺文具株式会社・報酬 18,500円・資材配送あり", "承認"],
      ["", "領収書の項目チェック 600枚", "Mori Accounting・個人情報マスキング確認待ち", "確認"],
      ["danger", "短納期 画像チェック", "Nami EC Studio・納期と作業量の再確認が必要", "差戻し"],
    ],
    metricsSide: [
      ["報酬条件", "確認済"],
      ["納期妥当性", "要確認"],
      ["個人情報", "1件注意"],
      ["資材配送", "2件確認"],
    ],
  },
  identity: {
    title: "本人確認",
    subtitle: "ワーカーと企業アカウントの認証状況を確認",
    noticeTitle: "本人確認キュー",
    noticeText: "書類不備と重複アカウントの疑いを優先して確認します",
    metrics: [
      ["18", "確認待ち"],
      ["4", "再提出"],
      ["88%", "通過率"],
    ],
    heading: "本人確認キュー",
    eyebrow: "identity queue",
    healthTitle: "確認状況",
    rows: [
      ["warn", "佐藤 美咲", "住所確認書類の文字が一部不鮮明", "再提出", "misaki"],
      ["", "青葉ギフト", "法人番号と担当者情報の照合待ち", "承認", ""],
      ["danger", "worker-2048", "重複登録の可能性あり", "保留", ""],
    ],
    metricsSide: [
      ["ワーカー確認", "12件"],
      ["企業確認", "6件"],
      ["再提出率", "22%"],
      ["平均処理", "9h"],
    ],
  },
  payments: {
    title: "支払い監視",
    subtitle: "検収後の支払い、保留、返金を追跡",
    noticeTitle: "支払い監視",
    noticeText: "検収完了後の支払い遅延と保留理由を確認します",
    metrics: [
      ["4", "保留中"],
      ["96%", "完了率"],
      ["21h", "平均検収"],
    ],
    heading: "支払い保留リスト",
    eyebrow: "payment monitor",
    healthTitle: "支払い健全性",
    rows: [
      ["warn", "封入作業 300セット", "検収完了、企業入金確認待ち", "確認"],
      ["", "ギフト箱の組み立て 200個", "返送到着済み、24時間以内に支払い予定", "追跡"],
      ["danger", "画像チェック 800枚", "成果物差戻しにより報酬保留", "介入"],
    ],
    metricsSide: [
      ["支払い完了率", "96%"],
      ["保留額", "42,000円"],
      ["返金処理", "1件"],
      ["遅延警告", "2件"],
    ],
  },
  issues: {
    title: "トラブル対応",
    subtitle: "問い合わせ、差戻し、未解決案件を管理",
    noticeTitle: "要対応チケット",
    noticeText: "納期遅延、作業条件の相違、検収トラブルを確認します",
    metrics: [
      ["2", "要対応"],
      ["5", "進行中"],
      ["31m", "初動平均"],
    ],
    heading: "トラブル対応キュー",
    eyebrow: "issue queue",
    healthTitle: "対応状況",
    rows: [
      ["danger", "納期に間に合わない相談", "ワーカー: 田中 亮・ギフト箱組み立て", "対応"],
      ["warn", "作業量が記載より多い", "ワーカー: Kana S.・ラベル貼り案件", "確認"],
      ["", "企業から返信がない", "ワーカー: 佐藤 美咲・質問から18時間経過", "催促"],
    ],
    metricsSide: [
      ["未解決", "2件"],
      ["進行中", "5件"],
      ["解決済み", "24件"],
      ["平均解決", "18h"],
    ],
  },
  companies: {
    title: "企業アカウント",
    subtitle: "企業ログイン用のメールアドレスとパスワードを管理",
    noticeTitle: "企業アカウント管理",
    noticeText: "運営が企業ごとにログイン情報を発行します",
    metrics: [
      ["0", "登録済み"],
      ["0", "本日追加"],
      ["運営発行", "ログイン情報"],
    ],
  },
  workers: {
    title: "ユーザー一覧",
    subtitle: "登録済みワーカーの確認・承認",
    noticeTitle: "ユーザー管理",
    noticeText: "ワーカーが個人情報を登録すると一覧に表示されます",
    metrics: [],
  },
};

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function loadCompanyAccounts() {
  try {
    const raw = window.localStorage?.getItem(COMPANY_ACCOUNTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((account) => account && typeof account === "object")
      .map((account) => ({
        companyName: account.companyName?.toString() || "",
        email: account.email?.toString() || "",
        password: account.password?.toString() || "",
      }));
  } catch (_err) {
    return [];
  }
}

function saveCompanyAccounts() {
  try {
    window.localStorage?.setItem(COMPANY_ACCOUNTS_STORAGE_KEY, JSON.stringify(companyAccounts));
  } catch (_err) {
    // Prototype storage can fail in restricted browsers; the in-memory account still works.
  }
}

function renderVuzzChannel(channelKey) {
  const channel = vuzzChannels[channelKey];
  if (!channel) return;

  if (channelKey === "companies") {
    renderCompanyAccountsChannel();
    return;
  }
  if (channelKey === "workers") {
    renderWorkerListChannel();
    return;
  }

  vuzzTitle.textContent = channel.title;
  vuzzSubtitle.textContent = channel.subtitle;
  vuzzNoticeTitle.textContent = channel.noticeTitle;
  vuzzNoticeText.textContent = channel.noticeText;
  vuzzMetrics.innerHTML = channel.metrics
    .map(([value, label]) => `<span><b>${value}</b> ${label}</span>`)
    .join("");
  vuzzContent.innerHTML = `
    <section class="portal-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">${channel.eyebrow}</p>
          <h2>${channel.heading}</h2>
        </div>
      </div>
      <div class="review-list">
        ${channel.rows
          .map(
            ([tone, title, description, action, workerId = ""]) => `
              <article${workerId ? ` data-vuzz-worker-id="${workerId}"` : ""}>
                <span class="status-dot ${tone}"></span>
                <div>
                  <strong>${title}</strong>
                  <p>${description}</p>
                </div>
                <button class="mini-button" type="button">${action}</button>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <aside class="portal-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">status</p>
          <h2>${channel.healthTitle}</h2>
        </div>
      </div>
      <dl class="ops-metrics">
        ${channel.metricsSide
          .map(
            ([label, value]) => `
              <div>
                <dt>${label}</dt>
                <dd>${value}</dd>
              </div>
            `,
          )
          .join("")}
      </dl>
    </aside>
  `;
  refreshIcons();
}

function renderCompanyAccountsChannel(alertText = "") {
  const channel = vuzzChannels.companies;
  const count = companyAccounts.length;
  vuzzTitle.textContent = channel.title;
  vuzzSubtitle.textContent = channel.subtitle;
  vuzzNoticeTitle.textContent = channel.noticeTitle;
  vuzzNoticeText.textContent = channel.noticeText;
  vuzzMetrics.innerHTML = `
    <span><b>${count}</b> 登録済み</span>
    <span><b>${count ? "発行済み" : "未発行"}</b> ログイン情報</span>
    <span><b>運営</b> 管理</span>
  `;
  document.getElementById("companyAccountCount").textContent = count;
  vuzzContent.innerHTML = `
    <section class="portal-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">company account</p>
          <h2>企業ログイン情報を追加</h2>
        </div>
      </div>
      ${alertText ? `<div class="mypage-alert">${escapeHtml(alertText)}</div>` : ""}
      <form class="form-grid" id="companyAccountForm" novalidate>
        <label class="span-2">
          会社名
          <input name="companyName" type="text" placeholder="例：白樺文具株式会社" />
        </label>
        <label class="span-2">
          メールアドレス
          <input name="email" type="text" inputmode="email" autocomplete="email" required />
        </label>
        <label class="span-2">
          パスワード
          <span class="password-field">
            <input name="password" type="password" inputmode="text" pattern="[A-Za-z0-9]+" title="半角英数字で入力してください。全角英数字は自動で半角に変換されます。" required />
            <button class="icon-button password-toggle" type="button" aria-label="パスワードを表示">
              <i data-lucide="eye"></i>
            </button>
          </span>
          <span class="field-hint">半角英数字</span>
        </label>
        <button class="primary-button wide span-2" type="submit">
          <i data-lucide="plus"></i>
          企業アカウントを追加
        </button>
      </form>
    </section>

    <aside class="portal-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">issued accounts</p>
          <h2>追加済み企業</h2>
        </div>
      </div>
      <div class="review-list">
        ${
          companyAccounts.length
            ? companyAccounts
                .map(
                  (account, index) => `
                    <article>
                      <span class="status-dot"></span>
                      <div>
                        <strong>${escapeHtml(account.companyName || "企業名未設定")}</strong>
                        <p>${escapeHtml(account.email)}・パスワード発行済み</p>
                      </div>
                      <button class="mini-button" data-edit-company-account="${index}" type="button">編集</button>
                    </article>
                  `,
                )
                .join("")
            : `<article>
                <span class="status-dot warn"></span>
                <div>
                  <strong>企業アカウント未追加</strong>
                  <p>左のフォームから企業のメールアドレスとパスワードを追加してください。</p>
                </div>
              </article>`
        }
      </div>
    </aside>
  `;

  vuzzContent.querySelectorAll("[data-edit-company-account]").forEach((button) => {
    button.addEventListener("click", () => {
      openCompanyAccountEditDialog(Number(button.dataset.editCompanyAccount));
    });
  });

  document.getElementById("companyAccountForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    normalizePasswordInputs(event.currentTarget);
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    companyAccounts.unshift({
      companyName: formData.get("companyName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      password: formData.get("password")?.toString() || "",
    });
    saveCompanyAccounts();
    renderCompanyAccountsChannel("企業アカウントを追加しました。");
  });
  setupPasswordInputs(vuzzContent);
  refreshIcons();
}

function openCompanyAccountEditDialog(index) {
  const account = companyAccounts[index];
  if (!account) return;

  let dialog = document.getElementById("companyAccountEditModal");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.className = "post-modal";
    dialog.id = "companyAccountEditModal";
    document.body.appendChild(dialog);
  }

  dialog.innerHTML = `
    <form class="modal-card" id="companyAccountEditForm" novalidate>
      <div class="modal-header">
        <div>
          <p class="eyebrow">company account</p>
          <h2>企業アカウント編集</h2>
        </div>
        <button class="icon-button" id="closeCompanyAccountEdit" type="button" aria-label="閉じる">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="form-grid">
        <label class="span-2">
          会社名
          <input name="companyName" type="text" value="${escapeHtml(account.companyName || "")}" placeholder="例：白樺文具株式会社" />
        </label>
        <label>
          メールアドレス
          <input name="email" type="text" inputmode="email" value="${escapeHtml(account.email || "")}" required />
        </label>
        <label>
          パスワード
          <span class="password-field">
            <input name="password" type="password" inputmode="text" pattern="[A-Za-z0-9]+" title="半角英数字で入力してください。全角英数字は自動で半角に変換されます。" value="${escapeHtml(account.password || "")}" required />
            <button class="icon-button password-toggle" type="button" aria-label="パスワードを表示">
              <i data-lucide="eye"></i>
            </button>
          </span>
        </label>
      </div>
      <div class="form-actions">
        <button class="secondary-button" id="cancelCompanyAccountEdit" type="button">キャンセル</button>
        <button class="primary-button" type="submit">
          <i data-lucide="save"></i>
          保存
        </button>
      </div>
    </form>
  `;

  setupPasswordInputs(dialog);
  refreshIcons();

  const closeDialog = () => dialog.close();
  dialog.querySelector("#closeCompanyAccountEdit")?.addEventListener("click", closeDialog);
  dialog.querySelector("#cancelCompanyAccountEdit")?.addEventListener("click", closeDialog);
  dialog.querySelector("#companyAccountEditForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    normalizePasswordInputs(event.currentTarget);
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    companyAccounts[index] = {
      companyName: formData.get("companyName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      password: formData.get("password")?.toString() || "",
    };
    saveCompanyAccounts();
    dialog.close();
    renderCompanyAccountsChannel("企業アカウントを更新しました。");
  });

  dialog.showModal?.();
}

function upsertRegisteredWorker() {
  const email = workerAuthEmail || "不明";
  const idx = registeredWorkers.findIndex((w) => w.email === email);
  const entry = {
    email,
    lastName: profileData.lastName,
    firstName: profileData.firstName,
    kanaLast: profileData.kanaLast,
    kanaFirst: profileData.kanaFirst,
    username: profileData.username,
    prefecture: profileData.prefecture,
    registeredAt: new Date().toLocaleString("ja-JP"),
    postalCode: profileData.postalCode,
    addressLine1: profileData.addressLine1,
    addressLine2: profileData.addressLine2,
    birthdate: profileData.birthdate,
    gender: profileData.gender,
    emailVerified,
    idSubmitted,
    idImages: { ...idImages },
    approved: identityVerified,
  };
  if (idx >= 0) {
    registeredWorkers[idx] = { ...registeredWorkers[idx], ...entry };
  } else {
    registeredWorkers.unshift(entry);
  }
  const badge = document.getElementById("workerCount");
  if (badge) badge.textContent = registeredWorkers.length;
}

function renderWorkerListChannel() {
  const ch = vuzzChannels.workers;
  const total = registeredWorkers.length;
  const approved = registeredWorkers.filter((w) => w.approved).length;
  const pending = total - approved;
  vuzzTitle.textContent = ch.title;
  vuzzSubtitle.textContent = ch.subtitle;
  vuzzNoticeTitle.textContent = ch.noticeTitle;
  vuzzNoticeText.textContent = ch.noticeText;
  vuzzMetrics.innerHTML = `
    <span><b>${total}</b> 登録済み</span>
    <span><b>${approved}</b> 承認済み</span>
    <span><b>${pending}</b> 承認待ち</span>
  `;
  document.getElementById("workerCount").textContent = total;
  vuzzContent.innerHTML = `
    <aside class="portal-panel" style="flex:1">
      <div class="section-head">
        <div>
          <p class="eyebrow">registered workers</p>
          <h2>登録ユーザー一覧</h2>
        </div>
      </div>
      <div class="worker-card-list">
        ${
          registeredWorkers.length
            ? registeredWorkers
                .map((w, i) => {
                  const hasId = w.idImages && (w.idImages.front || w.idImages.back || w.idImages.face);
                  const addressParts = [
                    w.postalCode ? `〒${w.postalCode.replace(/(\d{3})(\d{4})/, "$1-$2")}` : "",
                    w.prefecture || "",
                    w.addressLine1 || "",
                    w.addressLine2 || "",
                  ].filter(Boolean);
                  const addressStr = addressParts.length ? addressParts.join(" ") : "住所未設定";
                  return `
                    <article class="worker-card">
                      <div class="worker-card-required">
                        <div class="worker-card-name-row">
                          <span class="status-dot${w.approved ? "" : " warn"}"></span>
                          <div class="worker-card-name">
                            <strong>${escapeHtml(w.lastName + " " + w.firstName)}</strong>
                            <span class="worker-card-kana">${escapeHtml(w.kanaLast + " " + w.kanaFirst)}</span>
                          </div>
                          ${
                            w.approved
                              ? `<span class="worker-status-badge approved">承認済み</span>`
                              : `<button class="worker-approve-btn" type="button" data-approve-worker="${i}">承認する</button>`
                          }
                        </div>
                        <dl class="worker-card-dl">
                          ${w.username ? `<div>
                            <dt><i data-lucide="at-sign"></i></dt>
                            <dd>${escapeHtml(w.username)}</dd>
                          </div>` : ""}
                          <div>
                            <dt><i data-lucide="mail"></i></dt>
                            <dd>${escapeHtml(w.email)}</dd>
                          </div>
                          <div>
                            <dt><i data-lucide="map-pin"></i></dt>
                            <dd>${escapeHtml(addressStr)}</dd>
                          </div>
                          <div>
                            <dt><i data-lucide="clock"></i></dt>
                            <dd>登録日時：${escapeHtml(w.registeredAt)}</dd>
                          </div>
                        </dl>
                      </div>
                      <div class="worker-card-id-section">
                        <div class="worker-card-id-header">
                          <span class="worker-card-id-label">本人確認書類</span>
                          <span class="worker-id-optional-badge">任意</span>
                          ${
                            hasId
                              ? `<span class="worker-id-status submitted">提出済み</span>`
                              : `<span class="worker-id-status not-submitted">未提出</span>`
                          }
                          <button class="id-view-btn" type="button" data-view-id="${i}">
                            <i data-lucide="id-card"></i>身分証を確認
                          </button>
                        </div>
                      </div>
                    </article>
                  `;
                })
                .join("")
            : `<div class="worker-card-empty">
                <i data-lucide="users"></i>
                <p>登録ユーザーなし</p>
                <span>ユーザーが個人情報を登録すると、ここに表示されます。</span>
              </div>`
        }
      </div>
    </aside>
  `;
  vuzzContent.querySelectorAll("[data-approve-worker]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.approveWorker);
      registeredWorkers[idx] = { ...registeredWorkers[idx], approved: true };
      identityVerified = true;
      upsertRegisteredWorker();
      updateIdentityUI();
      renderWorkerListChannel();
    });
  });
  vuzzContent.querySelectorAll("[data-view-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const w = registeredWorkers[Number(btn.dataset.viewId)];
      if (w) openIdAllLightbox(w);
    });
  });
  refreshIcons();
}

function openIdLightbox(src, caption) {
  let overlay = document.getElementById("idLightboxOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "idLightboxOverlay";
    overlay.innerHTML = `
      <div class="id-lightbox-backdrop"></div>
      <div class="id-lightbox-box">
        <div class="id-lightbox-header">
          <span id="idLightboxCaption"></span>
          <button class="id-lightbox-close" type="button" aria-label="閉じる"><i data-lucide="x"></i></button>
        </div>
        <div class="id-lightbox-img-wrap">
          <img id="idLightboxImg" src="" alt="" />
        </div>
      </div>
    `;
    overlay.querySelector(".id-lightbox-backdrop").addEventListener("click", closeIdLightbox);
    overlay.querySelector(".id-lightbox-close").addEventListener("click", closeIdLightbox);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeIdLightbox(); });
    document.body.appendChild(overlay);
  }
  document.getElementById("idLightboxImg").src = src;
  document.getElementById("idLightboxImg").alt = caption;
  document.getElementById("idLightboxCaption").textContent = caption;
  overlay.classList.add("open");
  refreshIcons();
}

function closeIdLightbox() {
  document.getElementById("idLightboxOverlay")?.classList.remove("open");
}

function openIdAllLightbox(w) {
  let overlay = document.getElementById("idAllLightboxOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "idAllLightboxOverlay";
    overlay.innerHTML = `
      <div class="id-lightbox-backdrop"></div>
      <div class="id-lightbox-box id-all-lightbox-box">
        <div class="id-lightbox-header">
          <span id="idAllLightboxName"></span>
          <button class="id-lightbox-close" type="button" aria-label="閉じる"><i data-lucide="x"></i></button>
        </div>
        <div class="id-all-lightbox-body" id="idAllLightboxBody"></div>
      </div>
    `;
    overlay.querySelector(".id-lightbox-backdrop").addEventListener("click", closeIdAllLightbox);
    overlay.querySelector(".id-lightbox-close").addEventListener("click", closeIdAllLightbox);
    document.body.appendChild(overlay);
  }
  const name = `${w.lastName} ${w.firstName}`;
  document.getElementById("idAllLightboxName").textContent = `身分証確認 — ${name}`;
  const items = [
    { src: w.idImages?.front, label: "マイナンバーカード（表面）" },
    { src: w.idImages?.back,  label: "マイナンバーカード（裏面）" },
    { src: w.idImages?.face,  label: "顔写真" },
  ].filter((it) => it.src);
  document.getElementById("idAllLightboxBody").innerHTML = items.length
    ? items
        .map(
          (it) => `
            <figure class="id-all-lightbox-figure">
              <button class="id-thumb-btn id-all-thumb" data-lightbox-src="${it.src}" data-lightbox-caption="${it.label}" type="button">
                <img src="${it.src}" alt="${it.label}" />
                <span class="id-thumb-overlay"><i data-lucide="zoom-in"></i></span>
              </button>
              <figcaption>${it.label}</figcaption>
            </figure>
          `,
        )
        .join("")
    : `<div class="id-all-lightbox-empty">
        <i data-lucide="file-x"></i>
        <p>身分証が未提出です</p>
        <span>ユーザーが書類を提出するとここに表示されます。</span>
      </div>`;
  overlay.querySelectorAll("[data-lightbox-src]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openIdLightbox(btn.dataset.lightboxSrc, btn.dataset.lightboxCaption);
    });
  });
  overlay.classList.add("open");
  refreshIcons();
}

function closeIdAllLightbox() {
  document.getElementById("idAllLightboxOverlay")?.classList.remove("open");
}

function getWorkerApprovalStatus() {
  if (!isLoggedIn) return "ログイン/登録してください";
  if (!emailVerified) return "メール未認証・応募制限中";
  if (!profileSubmitted) return "個人情報未入力・応募制限中";
  if (!idSubmitted) return "身分証未提出・応募制限中";
  if (!contractIssued) return "契約書未交付・応募制限中";
  if (!vuzzApplicationSubmitted) return "運営申請前・応募制限中";
  if (!identityVerified) return "運営承認待ち・応募制限中";
  return "運営承認済み・応募可";
}

function getWorkerApprovalLabel() {
  if (!isLoggedIn) return "登録して認証へ";
  if (!emailVerified) return "メール認証後に応募";
  if (!identityVerified) return "運営承認後に応募";
  return "この案件に応募";
}

function getRewardSummary() {
  const loginDayCount = loginRecordDays.size;
  const loginPoints = loginDayCount * 10;
  const completedJobPoints = completedJobCount * 120;
  const points = loginPoints + completedJobPoints;
  const ranks = [
    { id: "bronze", label: "ブロンズ会員", threshold: 0 },
    { id: "silver", label: "シルバー会員", threshold: 500 },
    { id: "gold", label: "ゴールド会員", threshold: 1200 },
  ];
  const rewards = [
    { threshold: 500, label: "500円分ギフトカード" },
    { threshold: 1000, label: "1,000円分ギフトカード" },
    { threshold: 2000, label: "3,000円分ギフトカード" },
  ];
  const currentRank = ranks
    .slice()
    .reverse()
    .find((rank) => points >= rank.threshold);
  const nextRank = ranks.find((rank) => rank.threshold > points);
  const previousThreshold = currentRank?.threshold || 0;
  const nextThreshold = nextRank?.threshold || previousThreshold;
  const rankRange = Math.max(nextThreshold - previousThreshold, 1);
  const rankProgress = nextRank ? Math.min(((points - previousThreshold) / rankRange) * 100, 100) : 100;
  const nextReward = rewards.find((reward) => reward.threshold > points);

  return {
    points,
    ranks,
    rewards,
    currentRank,
    nextRank,
    nextReward,
    rankProgress,
    loginDayCount,
    loginPoints,
    completedJobPoints,
    pointsToNextRank: nextRank ? nextRank.threshold - points : 0,
  };
}

function recordWorkerLogin() {
  const now = new Date();
  const todayKey = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  loginRecordDays.add(todayKey);
}

function renderPrefectureOptions(selected = "") {
  return [
    '<option value="">選択してください</option>',
    ...prefectures.map(
      (prefecture) =>
        `<option value="${escapeHtml(prefecture)}" ${selected === prefecture ? "selected" : ""}>${escapeHtml(prefecture)}</option>`,
    ),
  ].join("");
}

function normalizePasswordValue(value = "") {
  return value.normalize("NFKC").replace(/[^A-Za-z0-9]/g, "");
}

function normalizePasswordInput(input) {
  const normalized = normalizePasswordValue(input.value);
  if (input.value === normalized) return;
  const selectionStart = input.selectionStart ?? normalized.length;
  const removedLength = input.value.length - normalized.length;
  input.value = normalized;
  if (document.activeElement === input) {
    const nextPosition = Math.max(0, Math.min(normalized.length, selectionStart - removedLength));
    input.setSelectionRange(nextPosition, nextPosition);
  }
}

function setupPasswordInputs(scope = document) {
  scope.querySelectorAll("input[type='password'], input[data-password-input]").forEach((input) => {
    input.dataset.passwordInput = "true";
    input.inputMode = "text";
    input.pattern = "[A-Za-z0-9]+";
    input.title = "半角英数字で入力してください。全角英数字は自動で半角に変換されます。";
    input.addEventListener("input", () => normalizePasswordInput(input));
  });
}

function normalizePasswordInputs(scope = document) {
  scope.querySelectorAll("input[data-password-input], input[type='password']").forEach(normalizePasswordInput);
}

function setupEmailValidation(scope = document) {
  scope.querySelectorAll("input[name='email']").forEach((input) => {
    if (input.dataset.emailValidation) return;
    input.dataset.emailValidation = "true";
    input.addEventListener("input", () => {
      const val = input.value;
      if (!val) { input.setCustomValidity(""); removeEmailError(input); return; }
      if (!val.includes("@")) {
        input.setCustomValidity("@を含むメールアドレスを入力してください");
        showEmailError(input, "@を含むメールアドレスを入力してください");
      } else {
        input.setCustomValidity("");
        removeEmailError(input);
      }
    });
  });
}

function showEmailError(input, msg) {
  let el = input.parentElement.querySelector(".email-error");
  if (!el) {
    el = document.createElement("span");
    el.className = "email-error field-error";
    input.after(el);
  }
  el.textContent = msg;
}

function removeEmailError(input) {
  input.parentElement.querySelector(".email-error")?.remove();
}

function updateIdentityUI() {
  const rewardSummary = getRewardSummary();
  const displayName = isLoggedIn ? profileData.username || (profileData.lastName && profileData.firstName ? `${profileData.lastName} ${profileData.firstName}` : profileData.lastName || profileData.firstName) || "未設定" : "ゲスト";
  workerNameText.textContent = displayName;
  if (profileData.avatarUrl) {
    workerAvatar.innerHTML = `<img src="${profileData.avatarUrl}" alt="アイコン" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
  } else {
    workerAvatar.innerHTML = displayName && displayName !== "ゲスト" && displayName !== "未設定"
      ? escapeHtml(displayName.charAt(0))
      : '<i data-lucide="user"></i>';
  }
  workerIdentityText.textContent = getWorkerApprovalStatus();
  workerRankText.textContent = profileSubmitted
    ? `${rewardSummary.currentRank.label}・${rewardSummary.points.toLocaleString("ja-JP")}pt`
    : "";
  workerRankText.classList.toggle("is-hidden", !profileSubmitted);
  workerPresence.classList.toggle("warning", !isLoggedIn || !emailVerified || !identityVerified);
  document.querySelector("#applyButton").innerHTML = !isLoggedIn
    ? '<i data-lucide="log-in"></i> ログインして応募する'
    : !emailVerified
      ? '<i data-lucide="mail-check"></i> メール認証後に応募'
      : identityVerified
        ? '<i data-lucide="check-circle-2"></i> この案件に応募'
        : '<i data-lucide="badge-alert"></i> 運営承認後に応募';
  document.querySelector("#guestTopbarActions")?.classList.toggle("is-hidden", isLoggedIn);
  document.querySelectorAll("[data-logout]").forEach((btn) => {
    const inVuzz = !!btn.closest("#vuzzApp");
    const inCompany = !!btn.closest("#companyApp");
    const visible = inVuzz ? isVuzzLoggedIn : inCompany ? true : isLoggedIn;
    btn.classList.toggle("is-hidden", !visible);
  });
  refreshIcons();
}

function getWorkerAuthDisplay() {
  return workerAuthEmail || "認証済みメールアドレス";
}

function birthdateSelectsHtml(birthdate = "") {
  const [y = "", m = "", d = ""] = birthdate.split("-");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1929 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const opt = (val, selected, label) =>
    `<option value="${val}" ${selected === String(val) ? "selected" : ""}>${label ?? val}</option>`;
  return `
    <div class="birthdate-selects">
      <div class="select-wrap">
        <select name="birthdateYear" required>
          <option value="">年</option>
          ${years.map((v) => opt(v, y)).join("")}
        </select>
      </div>
      <div class="select-wrap">
        <select name="birthdateMonth" required>
          <option value="">月</option>
          ${months.map((v) => opt(v, m.replace(/^0/, ""), `${v}月`)).join("")}
        </select>
      </div>
      <div class="select-wrap">
        <select name="birthdateDay" required>
          <option value="">日</option>
          ${days.map((v) => opt(v, d.replace(/^0/, ""), `${v}日`)).join("")}
        </select>
      </div>
    </div>
  `;
}

function parseBirthdate(formData) {
  const y = formData.get("birthdateYear")?.toString() || "";
  const m = (formData.get("birthdateMonth")?.toString() || "").padStart(2, "0");
  const d = (formData.get("birthdateDay")?.toString() || "").padStart(2, "0");
  return y && m && d ? `${y}-${m}-${d}` : "";
}

function populateBirthdateSelects(container) {
  if (!container) return;
  const currentYear = new Date().getFullYear();
  const yearSel = container.querySelector("select[name='birthdateYear']");
  const monthSel = container.querySelector("select[name='birthdateMonth']");
  const daySel = container.querySelector("select[name='birthdateDay']");
  if (yearSel && yearSel.options.length <= 1) {
    for (let y = currentYear; y >= 1930; y--) {
      yearSel.add(new Option(y, y));
    }
  }
  if (monthSel && monthSel.options.length <= 1) {
    for (let mo = 1; mo <= 12; mo++) {
      monthSel.add(new Option(`${mo}月`, mo));
    }
  }
  if (daySel && daySel.options.length <= 1) {
    for (let day = 1; day <= 31; day++) {
      daySel.add(new Option(`${day}日`, day));
    }
  }
}

function toHalfWidth(str) {
  return str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/[^A-Za-z0-9]/g, "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function getAiReply(message) {
  const normalizedMessage = message.toLowerCase();

  if (message.includes("本人") || message.includes("認証") || message.includes("登録")) {
    return "応募するには、メール認証、個人情報入力、身分証提出、契約書受領、運営承認の順に進みます。公式LINE登録は任意です。";
  }

  if (message.includes("応募") || message.includes("仕事")) {
    return "未ログインでも案件は見られます。応募ボタンを押すと登録へ進み、ログイン済みの場合は本人認証ページへ移動します。";
  }

  if (message.includes("報酬") || message.includes("支払") || message.includes("お金")) {
    return "報酬は案件詳細の金額と検収条件を必ず確認してください。納品後、企業の検収が完了してから支払い対象になります。";
  }

  if (message.includes("納期") || message.includes("間に合") || message.includes("遅れ")) {
    return "納期が不安な案件は、応募前に作業量、返送方法、検収までの時間を確認するのがおすすめです。無理な場合は応募前に別案件を選びましょう。";
  }

  if (message.includes("契約") || message.includes("身分証") || message.includes("line") || normalizedMessage.includes("line")) {
    return "契約書受領まで完了すると運営へ申請されます。身分証提出は必須、公式LINE登録は任意です。";
  }

  return "内容を確認しました。応募前なら、作業内容、納期、報酬、検収条件、送料の5点を見ておくと安心です。気になる案件名を送ってくれれば、確認ポイントを整理します。";
}

function closeUtilityPopover() {
  utilityPopover.classList.add("is-hidden");
  notificationsButton.classList.remove("active");
  settingsButton.classList.remove("active");
  notificationsButton.setAttribute("aria-expanded", "false");
  settingsButton.setAttribute("aria-expanded", "false");
}

function setWorkerChannel(channel, priceTier = "all", category = "all") {
  activeChannel = channel;
  activePriceTier = priceTier;
  activeCategory = category;
  activeFilter = "all";
  document.querySelectorAll("#workerApp .channel").forEach((item) => {
    const isActive =
      item.dataset.channel === channel &&
      (item.dataset.priceTier || "all") === priceTier &&
      (item.dataset.category || "all") === category;
    item.classList.toggle("active", isActive);
  });
  document.querySelectorAll("#workerApp .filter").forEach((item) => {
    item.classList.toggle("active", item.dataset.filter === activeFilter);
  });
}

function openJobNotification(jobId) {
  const job = jobs.find((item) => item.id === jobId) || jobs[0];
  if (!job) return;
  showRole("worker");
  setWorkerChannel("jobs", getJobPriceTier(job), job.channel);
  selectJob(job.id);
  closeUtilityPopover();
}

function openIdentityProgressNotification() {
  showRole("worker");
  closeUtilityPopover();
  if (!isLoggedIn) {
    renderRegistrationForm("本人確認の進捗を見るにはログインが必要です。");
    return;
  }
  renderMyPage("本人確認の進捗を表示しています。");
}

function openSavedJobsNotification() {
  showRole("worker");
  setWorkerChannel("saved");
  renderFeed();
  closeUtilityPopover();
}

function handleNotificationClick(action) {
  if (action === "new-job") {
    openJobNotification(1);
    return;
  }
  if (action === "identity-progress") {
    openIdentityProgressNotification();
    return;
  }
  if (action === "saved-jobs") {
    openSavedJobsNotification();
  }
}

function renderUtilityPopover(type) {
  const activeButton = type === "notifications" ? notificationsButton : settingsButton;
  const otherButton = type === "notifications" ? settingsButton : notificationsButton;
  const isAlreadyOpen = !utilityPopover.classList.contains("is-hidden") && activeButton.classList.contains("active");

  if (isAlreadyOpen) {
    closeUtilityPopover();
    return;
  }

  otherButton.classList.remove("active");
  otherButton.setAttribute("aria-expanded", "false");
  activeButton.classList.add("active");
  activeButton.setAttribute("aria-expanded", "true");
  utilityPopover.classList.remove("is-hidden");

  utilityPopover.innerHTML =
    type === "notifications"
      ? `
        <div class="utility-head">
          <strong>通知</strong>
          <span>3件</span>
        </div>
        <div class="utility-list">
          <button class="utility-item" data-notification-action="new-job" type="button">
            <span class="utility-icon"><i data-lucide="briefcase-business"></i></span>
            <div>
              <strong>新しい案件が追加されました</strong>
              <p>検品・梱包に「封入作業 300セット」が届いています。</p>
            </div>
          </button>
          <button class="utility-item" data-notification-action="identity-progress" type="button">
            <span class="utility-icon"><i data-lucide="shield-check"></i></span>
            <div>
              <strong>本人確認の進捗</strong>
              <p>${getWorkerApprovalStatus()}</p>
            </div>
          </button>
          <button class="utility-item" data-notification-action="saved-jobs" type="button">
            <span class="utility-icon"><i data-lucide="bookmark"></i></span>
            <div>
              <strong>保存済み案件</strong>
              <p>${savedJobs.size}件の案件を保存しています。</p>
            </div>
          </button>
        </div>
      `
      : `
        <div class="utility-head">
          <strong>設定</strong>
          <span>ワーカー</span>
        </div>
        <div class="utility-list">
          <div class="setting-row">
            <div>
              <strong>新着案件通知</strong>
              <span>条件に合う案件を通知</span>
            </div>
            <button class="setting-toggle is-on" type="button" aria-label="新着案件通知" aria-pressed="true"></button>
          </div>
          <div class="setting-row">
            <div>
              <strong>応募ステータス通知</strong>
              <span>承認、差戻し、採用の更新</span>
            </div>
            <button class="setting-toggle is-on" type="button" aria-label="応募ステータス通知" aria-pressed="true"></button>
          </div>
          <div class="setting-row">
            <div>
              <strong>サポート通知</strong>
              <span>運営からの連絡</span>
            </div>
            <button class="setting-toggle" type="button" aria-label="サポート通知" aria-pressed="false"></button>
          </div>
        </div>
      `;

  utilityPopover.querySelectorAll(".setting-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const isOn = !button.classList.contains("is-on");
      button.classList.toggle("is-on", isOn);
      button.setAttribute("aria-pressed", String(isOn));
    });
  });
  utilityPopover.querySelectorAll("[data-notification-action]").forEach((button) => {
    button.addEventListener("click", () => handleNotificationClick(button.dataset.notificationAction));
  });

  refreshIcons();
}

function showLoginRequired() {
  const popup = document.getElementById("loginRequiredPopup");
  if (!popup) return;

  popup.classList.add("is-visible");
  refreshIcons();

  const loginBtn = document.getElementById("loginPopupLoginBtn");
  const closeBtn = document.getElementById("loginPopupCloseBtn");

  const hidePopup = () => popup.classList.remove("is-visible");

  loginBtn?.addEventListener("click", () => {
    hidePopup();
    renderRegistrationForm();
  }, { once: true });

  closeBtn?.addEventListener("click", hidePopup, { once: true });
}

function applyToJob(jobId) {
  const job = jobs.find((item) => item.id === jobId);
  if (!job) return;

  if (!isLoggedIn) {
    renderRegistrationForm("応募するにはログインまたは会員登録が必要です。");
    return;
  }

  if (!emailVerified) {
    renderEmailVerification("応募するにはメール認証が必要です。");
    return;
  }

  if (!identityVerified) {
    renderMyPage("応募するには、個人情報・身分証・契約書交付を完了し、運営の承認を受ける必要があります。");
    return;
  }

  if (!applications.some((application) => application.jobId === job.id)) {
    applications.unshift({
      jobId: job.id,
      title: job.title,
      company: job.company,
      pay: job.pay,
      status: "応募済み",
      updated: "now",
    });
  }

  document.querySelector("#applyButton").innerHTML =
    '<i data-lucide="sparkles"></i> 応募を受け付けました';
  refreshIcons();
}

function renderRegistrationForm(alertText = "", mode = "login") {
  if (isLoggedIn) {
    if (!emailVerified) {
      renderEmailVerification("登録済みです。メール認証を完了してください。");
      return;
    }
    renderMyPage(identityVerified ? "ログイン済みです。応募ステータスを確認できます。" : "ログイン済みです。応募には個人情報の入力が必要です。");
    return;
  }

  const isSignup = mode === "signup";
  const isPasswordReset = mode === "passwordReset";
  const isPasswordResetSent = mode === "passwordResetSent";

  const titleMap = { signup: "ワーカー会員登録", passwordReset: "パスワード再設定", passwordResetSent: "パスワード再設定", login: "ワーカーログイン" };
  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  channelTitle.textContent = titleMap[mode] || "ワーカーログイン";
  feedTitle.textContent = titleMap[mode] || "ワーカーログイン";
  feedIntroText.textContent = isSignup
    ? "メールアドレスとパスワードを入力してください。"
    : isPasswordReset
    ? "登録したメールアドレスを入力してください。"
    : "案件は登録なしで閲覧できます。応募するにはログインまたは会員登録が必要です。";
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");

  let formHtml;
  if (isSignup) {
    formHtml = `
      <form class="portal-panel registration-form" id="workerRegistrationForm">
        <div class="section-head">
          <div>
            <p class="eyebrow">worker signup</p>
            <h2>会員登録</h2>
          </div>
        </div>
        <p class="form-note">メールアドレスを入力してください。認証コードを送信します。</p>
        <div class="form-grid single-column-fields">
          <label>
            メールアドレス
            <input name="email" type="text" inputmode="email" autocomplete="email" required />
          </label>
        </div>
        <button class="primary-button wide" type="submit">
          <i data-lucide="mail-check"></i>
          認証コードを送信
        </button>
        <button class="secondary-button wide" id="backWorkerLoginButton" type="button">
          <i data-lucide="arrow-left"></i>
          ログインに戻る
        </button>
      </form>
    `;
  } else if (isPasswordResetSent) {
    formHtml = `
      <div class="portal-panel registration-form password-reset-sent">
        <div class="section-head">
          <div>
            <p class="eyebrow">password reset</p>
            <h2>パスワード再設定</h2>
          </div>
        </div>
        <div class="password-reset-confirm">
          <i data-lucide="mail-check"></i>
          <p><strong>${escapeHtml(alertText)}</strong> にパスワード再設定のメールを送信しました。</p>
          <span>メールに記載のリンクからパスワードを再設定してください。</span>
        </div>
        <button class="secondary-button wide" id="backWorkerLoginButton" type="button">
          <i data-lucide="arrow-left"></i>
          ログインに戻る
        </button>
      </div>
    `;
  } else if (isPasswordReset) {
    formHtml = `
      <form class="portal-panel registration-form" id="passwordResetForm">
        <div class="section-head">
          <div>
            <p class="eyebrow">password reset</p>
            <h2>パスワードを再設定する</h2>
          </div>
        </div>
        <p class="form-note">登録したメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。</p>
        <div class="form-grid single-column-fields">
          <label>
            メールアドレス
            <input name="email" type="text" inputmode="email" autocomplete="email" required />
          </label>
        </div>
        <button class="primary-button wide" type="submit">
          <i data-lucide="send"></i>
          再設定メールを送る
        </button>
        <button class="secondary-button wide" id="backWorkerLoginButton" type="button">
          <i data-lucide="arrow-left"></i>
          ログインに戻る
        </button>
      </form>
    `;
  } else {
    formHtml = `
      <form class="portal-panel registration-form" id="workerLoginForm">
        <div class="section-head">
          <div>
            <p class="eyebrow">worker login</p>
            <h2>ログイン</h2>
          </div>
        </div>
        <div class="form-grid single-column-fields">
          <label>
            メールアドレス
            <input name="email" type="text" inputmode="email" autocomplete="email" required />
          </label>
          <label>
            パスワード
            <span class="password-field">
              <input name="password" type="password" inputmode="text" pattern="[A-Za-z0-9]+" title="半角英数字で入力してください。全角英数字は自動で半角に変換されます。" required />
              <button class="icon-button password-toggle" type="button" aria-label="パスワードを表示">
                <i data-lucide="eye"></i>
              </button>
            </span>
            <span class="field-hint">半角英数字</span>
          </label>
        </div>
        <button class="primary-button wide" type="submit">
          <i data-lucide="log-in"></i>
          ログイン
        </button>
        <button class="text-link-button" id="forgotPasswordButton" type="button">
          パスワードを忘れた方はこちら
        </button>
        <button class="text-link-button" id="openWorkerSignupButton" type="button">
          会員登録はこちら
        </button>
      </form>
      <div class="dev-bypass">
        <p class="dev-bypass-label"><i data-lucide="flask-conical"></i> テスト用ショートカット（本番では非表示）</p>
        <div class="dev-bypass-buttons">
          <button class="dev-bypass-btn" id="devBypassAdminFromLogin" type="button">
            <i data-lucide="shield-check"></i> 運営ページへ（認証スキップ）
          </button>
          <button class="dev-bypass-btn" id="devBypassCompanyFromLogin" type="button">
            <i data-lucide="building-2"></i> クライアントページへ（認証スキップ）
          </button>
        </div>
      </div>
    `;
  }

  feed.innerHTML = `
    ${!isPasswordResetSent && alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="registration-grid">
      ${formHtml}
    </section>
  `;

  document.querySelector("#workerLoginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    normalizePasswordInputs(event.currentTarget);
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    workerAuthEmail = formData.get("email")?.toString().trim() || "ログイン済み";
    loginExistingWorker(workerAuthEmail);
  });
  document.querySelector("#forgotPasswordButton")?.addEventListener("click", () => {
    renderRegistrationForm("", "passwordReset");
  });
  document.querySelector("#passwordResetForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim() || "";
    renderRegistrationForm(email, "passwordResetSent");
  });
  document.querySelector("#openWorkerSignupButton")?.addEventListener("click", () => {
    renderRegistrationForm("", "signup");
  });
  document.querySelector("#workerRegistrationForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    workerAuthEmail = formData.get("email")?.toString().trim() || "メール認証済み";
    isLoggedIn = true;
    emailVerified = false;
    profileSubmitted = false;
    idSubmitted = false;
    contractIssued = false;
    lineRegistered = false;
    vuzzApplicationSubmitted = false;
    identityVerified = false;
    isEditingProfile = false;
    profileFormStep = 1;
    updateIdentityUI();
    renderEmailVerification("登録が完了しました。メールに届いた認証コードを確認してください。");
    sendVerificationEmail(workerAuthEmail);
  });
  document.querySelector("#backWorkerLoginButton")?.addEventListener("click", () => {
    renderRegistrationForm();
  });
  document.getElementById("devBypassAdminFromLogin")?.addEventListener("click", () => {
    isVuzzLoggedIn = true;
    showRole("vuzz");
    renderVuzzChannel("review");
  });
  document.getElementById("devBypassCompanyFromLogin")?.addEventListener("click", () => {
    enterDemoCompany();
  });
  setupPasswordInputs(feed);
  setupEmailValidation(feed);
  refreshIcons();
}

async function sendVerificationEmail(email) {
  try {
    await fetch("/api/send-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  } catch (_err) {
    // silent — user can retry via resend button
  }
}

async function verifyEmailCode(email, code) {
  const res = await fetch("/api/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = await res.json();
  return data.success === true;
}

function renderEmailVerification(alertText = "") {
  if (!isLoggedIn) {
    renderRegistrationForm("メール認証の前に会員登録が必要です。", "signup");
    return;
  }

  if (emailVerified) {
    renderMyPage(profileSubmitted ? "メール認証済みです。応募には本人確認を完了してください。" : "メール認証済みです。続けて個人情報を入力してください。");
    return;
  }

  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  channelTitle.textContent = "メール認証";
  feedTitle.textContent = "メール認証";
  feedIntroText.textContent =
    "登録したメールアドレスに送信された認証コードを入力してください。メール認証後に本人確認へ進めます。";
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");

  feed.innerHTML = `
    ${alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="registration-grid">
      <form class="portal-panel registration-form" id="emailVerificationForm">
        <div class="section-head">
          <div>
            <p class="eyebrow">email verification</p>
            <h2>メール認証</h2>
          </div>
          <span class="status-badge">未認証</span>
        </div>
        <p class="form-note">${escapeHtml(getWorkerAuthDisplay())} に6桁の認証コードを送信しました。</p>
        <div class="form-grid">
          <label class="span-2">
            認証コード
            <input id="emailCodeInput" type="text" inputmode="numeric" maxlength="6" placeholder="123456" autocomplete="one-time-code" />
            <span class="field-hint">6桁の数字</span>
          </label>
        </div>
        <button class="primary-button wide" type="submit">
          <i data-lucide="mail-check"></i>
          メール認証を完了する
        </button>
        <button class="secondary-button wide" id="resendEmailButton" type="button">
          <i data-lucide="refresh-cw"></i>
          認証メールを再送
        </button>
      </form>
    </section>
  `;

  const emailCodeInput = document.querySelector("#emailCodeInput");
  emailCodeInput?.addEventListener("input", () => {
    emailCodeInput.value = toHalfWidth(emailCodeInput.value).replace(/[^0-9]/g, "");
  });

  const submitBtn = document.querySelector("#emailVerificationForm button[type='submit']");
  document.querySelector("#emailVerificationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = emailCodeInput?.value.trim() || "";
    if (!/^[0-9]{6}$/.test(code)) {
      renderEmailVerification("認証コードは6桁の数字で入力してください。");
      return;
    }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "確認中…"; }
    try {
      const ok = await verifyEmailCode(workerAuthEmail, code);
      if (!ok) {
        renderEmailVerification("認証コードが正しくありません。再度お確かめください。");
        return;
      }
    } catch (_err) {
      renderEmailVerification("通信エラーが発生しました。再度お試しください。");
      return;
    }
    emailVerified = true;
    identityVerified = false;
    upsertRegisteredWorker();
    recordWorkerLogin();
    updateIdentityUI();
    renderPostVerificationSetup();
  });
  document.querySelector("#resendEmailButton").addEventListener("click", async () => {
    await sendVerificationEmail(workerAuthEmail);
    renderEmailVerification("認証メールを再送しました。");
  });
  refreshIcons();
}

function renderPostVerificationSetup(alertText = "") {
  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");
  channelTitle.textContent = "アカウント設定";
  feedTitle.textContent = "アカウント設定";
  feedIntroText.textContent = "パスワードと基本情報を入力してください。";

  feed.innerHTML = `
    ${alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="registration-grid">
      <form class="portal-panel registration-form" id="accountSetupForm">
        <p class="form-note">パスワードと基本情報を入力してください。（非公開）</p>

        <p class="setup-section-label">パスワード</p>
        <div class="form-grid single-column-fields">
          <label>
            パスワード
            <span class="password-field">
              <input name="password" type="password" autocomplete="new-password" inputmode="text" pattern="[A-Za-z0-9]+" title="半角英数字で入力してください。全角英数字は自動で半角に変換されます。" minlength="6" required />
              <button class="icon-button password-toggle" type="button" aria-label="パスワードを表示">
                <i data-lucide="eye"></i>
              </button>
            </span>
            <span class="field-hint">半角英数字6文字以上</span>
          </label>
          <label>
            パスワード（確認）
            <span class="password-field">
              <input name="passwordConfirm" type="password" autocomplete="new-password" inputmode="text" pattern="[A-Za-z0-9]+" title="半角英数字で入力してください。全角英数字は自動で半角に変換されます。" minlength="6" required />
              <button class="icon-button password-toggle" type="button" aria-label="パスワードを表示">
                <i data-lucide="eye"></i>
              </button>
            </span>
            <span class="field-hint">半角英数字6文字以上</span>
          </label>
        </div>

        <p class="setup-section-label">基本情報</p>
        <div class="form-grid">
          <label>
            姓
            <input name="lastName" type="text" placeholder="山田" value="${escapeHtml(profileData.lastName)}" required />
          </label>
          <label>
            名
            <input name="firstName" type="text" placeholder="太郎" value="${escapeHtml(profileData.firstName)}" required />
          </label>
          <label>
            かな（姓）
            <input name="kanaLast" type="text" placeholder="やまだ" value="${escapeHtml(profileData.kanaLast)}" required />
          </label>
          <label>
            かな（名）
            <input name="kanaFirst" type="text" placeholder="たろう" value="${escapeHtml(profileData.kanaFirst)}" required />
          </label>
          <div class="span-2 birthdate-field-wrap">
            <span class="birthdate-field-label">生年月日</span>
            ${birthdateSelectsHtml(profileData.birthdate)}
          </div>
          <fieldset class="gender-options span-2">
            <legend>性別</legend>
            <div class="gender-radio-row">
              ${["男性", "女性", "その他"].map((g) => `
                <label>
                  <input type="radio" name="gender" value="${g}" ${profileData.gender === g ? "checked" : ""} required />
                  ${g}
                </label>
              `).join("")}
            </div>
          </fieldset>
        </div>

        <div class="form-actions">
          <button class="secondary-button" id="backToLoginButton" type="button">
            <i data-lucide="arrow-left"></i>
            ログインに戻る
          </button>
          <button class="primary-button" type="submit">
            <i data-lucide="arrow-right"></i>
            次へ
          </button>
        </div>
      </form>
    </section>
  `;

  document.querySelector("#backToLoginButton")?.addEventListener("click", () => {
    renderRegistrationForm();
  });

  document.querySelector("#accountSetupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    normalizePasswordInputs(event.currentTarget);
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    const pw = formData.get("password")?.toString() || "";
    const pwConfirm = formData.get("passwordConfirm")?.toString() || "";
    if (pw !== pwConfirm) {
      let errorEl = event.currentTarget.querySelector(".pw-mismatch-error");
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.className = "pw-mismatch-error mypage-alert";
        event.currentTarget.querySelector("button[type='submit']").before(errorEl);
      }
      errorEl.textContent = "パスワードが一致しません。もう一度入力してください。";
      return;
    }
    event.currentTarget.querySelector(".pw-mismatch-error")?.remove();
    workerPassword = pw;
    profileData.lastName = formData.get("lastName")?.toString().trim() || "";
    profileData.firstName = formData.get("firstName")?.toString().trim() || "";
    profileData.kanaLast = formData.get("kanaLast")?.toString().trim() || "";
    profileData.kanaFirst = formData.get("kanaFirst")?.toString().trim() || "";
    profileData.birthdate = parseBirthdate(formData);
    profileData.gender = formData.get("gender")?.toString() || "";
    profileFormStep = 2;
    updateIdentityUI();
    renderMyPage("基本情報を保存しました。続けて住所を入力してください。");
  });

  document.querySelectorAll(".password-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".password-field")?.querySelector("input");
      if (!input) return;
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      btn.querySelector("i")?.setAttribute("data-lucide", isHidden ? "eye-off" : "eye");
      refreshIcons();
    });
  });
  setupPasswordInputs(feed);

  const pwInput = feed.querySelector('input[name="password"]');
  const pwConfirmInput = feed.querySelector('input[name="passwordConfirm"]');
  function checkPasswordMatch() {
    if (!pwConfirmInput.value) return;
    const isMatch = pwInput.value === pwConfirmInput.value;
    let errorEl = feed.querySelector(".pw-mismatch-inline");
    if (!isMatch) {
      if (!errorEl) {
        errorEl = document.createElement("span");
        errorEl.className = "pw-mismatch-inline field-error";
        pwConfirmInput.closest("label")?.appendChild(errorEl);
      }
      errorEl.textContent = "パスワードが一致しません";
    } else {
      errorEl?.remove();
    }
  }
  pwInput?.addEventListener("input", checkPasswordMatch);
  pwConfirmInput?.addEventListener("input", checkPasswordMatch);

  refreshIcons();
}

function renderUsernameSetup(alertText = "") {
  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");
  channelTitle.textContent = "ユーザー名設定";
  feedTitle.textContent = "ユーザー名設定";
  feedIntroText.textContent = "表示名として使われます。";

  feed.innerHTML = `
    ${alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="registration-grid">
      <form class="portal-panel registration-form" id="usernameSetupForm">
        <p class="form-note">他のユーザーに表示される名前を入力してください。半角英数字で入力できます。</p>
        <div class="form-grid single-column-fields">
          <label>
            ユーザー名
            <input name="username" type="text" value="${escapeHtml(profileData.username)}" required autocomplete="username" />
          </label>
        </div>
        <div class="form-actions">
          <button class="secondary-button" id="usernameSetupBackButton" type="button">
            <i data-lucide="arrow-left"></i>
            戻る
          </button>
          <button class="primary-button" type="submit">
            <i data-lucide="check"></i>
            登録を完了する
          </button>
        </div>
      </form>
    </section>
  `;

  const usernameInput = feed.querySelector('input[name="username"]');
  usernameInput?.addEventListener("input", () => {
    const converted = toHalfWidth(usernameInput.value);
    if (usernameInput.value !== converted) usernameInput.value = converted;
  });

  feed.querySelector("#usernameSetupBackButton")?.addEventListener("click", () => {
    profileFormStep = 2;
    renderMyPage();
  });

  feed.querySelector("#usernameSetupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawUsername = toHalfWidth(event.currentTarget.querySelector('input[name="username"]').value.trim());
    if (!rawUsername) {
      renderUsernameSetup("ユーザー名を入力してください。");
      return;
    }
    profileData.username = rawUsername;
    const wasEditing = isEditingProfile;
    profileSubmitted = true;
    profileFormStep = 1;
    isEditingProfile = false;
    upsertRegisteredWorker();
    updateIdentityUI();
    renderMyPage(wasEditing ? "個人情報を更新しました。" : "個人情報を保存しました。続けて身分証を提出してください。");
  });

  refreshIcons();
}

function renderMyPage(alertText = "") {
  if (!isLoggedIn) {
    renderRegistrationForm("マイページを見るには登録またはログインが必要です。");
    return;
  }

  if (!emailVerified) {
    renderEmailVerification(alertText || "マイページへ進む前にメール認証が必要です。");
    return;
  }

  if (profileFormStep === 3) {
    renderUsernameSetup(alertText);
    return;
  }

  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  channelTitle.textContent = profileSubmitted ? "マイページ" : "個人情報入力";
  feedTitle.textContent = profileSubmitted ? "マイページ" : "個人情報入力";
  feedIntroText.textContent =
    "メール認証の後、個人情報、身分証、契約書交付を完了すると運営へ申請されます。公式LINE登録は任意です。";
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");

  const rewardSummary = getRewardSummary();
  const nextRankText = rewardSummary.nextRank
    ? `${rewardSummary.nextRank.label}まで${rewardSummary.pointsToNextRank.toLocaleString("ja-JP")}pt`
    : "最高ランクです";
  const applicationRows = applications.length
    ? applications
        .map(
          (application) => `
            <article>
              <span class="status-dot"></span>
              <div>
                <strong>${application.title}</strong>
                <p>${application.company}・${application.pay}・${application.updated}</p>
              </div>
              <span class="status-badge">${application.status}</span>
            </article>
          `,
        )
        .join("")
    : `
      <article>
        <span class="status-dot warn"></span>
        <div>
          <strong>応募履歴はまだありません</strong>
          <p>運営承認が完了すると、案件に応募できるようになります。</p>
        </div>
        <span class="status-badge">未応募</span>
      </article>
    `;

  const steps = [
    ["メール認証", emailVerified, emailVerified ? "完了" : "未完了"],
    ["個人情報入力", profileSubmitted, profileSubmitted ? "完了" : "未入力"],
    ["身分証提出", idSubmitted, idSubmitted ? "提出済み" : "未提出"],
    ["契約書交付", contractIssued, contractIssued ? "交付済み" : "未交付"],
    ["公式LINE登録", lineRegistered, lineRegistered ? "登録済み" : "任意"],
    ["運営申請", vuzzApplicationSubmitted, vuzzApplicationSubmitted ? "申請済み" : "未申請"],
    ["運営承認", identityVerified, identityVerified ? "承認済み" : "承認待ち"],
  ];

  const editProfileButton = profileSubmitted
    ? `
      <button class="secondary-button wide" id="editProfileButton" type="button">
        <i data-lucide="arrow-left"></i>
        個人情報に戻る
      </button>
    `
    : "";
  const profileForm = `
    <form class="onboarding-action" id="profileForm">
      <div class="verified-email-box">
        <span>認証済みメールアドレス</span>
        <strong>${escapeHtml(getWorkerAuthDisplay())}</strong>
      </div>
      <div class="form-grid">
        ${
          profileFormStep === 1
            ? `
              <label>
                姓
                <input name="lastName" type="text" placeholder="山田" value="${escapeHtml(profileData.lastName)}" required />
              </label>
              <label>
                名
                <input name="firstName" type="text" placeholder="太郎" value="${escapeHtml(profileData.firstName)}" required />
              </label>
              <label>
                かな（姓）
                <input name="kanaLast" type="text" placeholder="やまだ" value="${escapeHtml(profileData.kanaLast)}" required />
              </label>
              <label>
                かな（名）
                <input name="kanaFirst" type="text" placeholder="たろう" value="${escapeHtml(profileData.kanaFirst)}" required />
              </label>
              <label class="span-2">
                生年月日
                <input name="birthdate" type="date" value="${escapeHtml(profileData.birthdate)}" required />
              </label>
              <fieldset class="gender-options span-2">
                <legend>性別</legend>
                ${["男性", "女性", "その他"].map((g) => `
                  <label>
                    <input type="radio" name="gender" value="${g}" ${profileData.gender === g ? "checked" : ""} required />
                    ${g}
                  </label>
                `).join("")}
              </fieldset>
            `
            : profileFormStep === 2
              ? `
              <label>
                <span class="label-with-hint">郵便番号<span class="field-hint">ハイフンなし7桁</span></span>
                <input name="postalCode" type="text" inputmode="numeric" pattern="[0-9]{7}" maxlength="8" placeholder="1234567" value="${escapeHtml(profileData.postalCode.replace(/-/g, ""))}" required />
              </label>
              <label>
                都道府県
                <select name="prefecture" required>
                  ${renderPrefectureOptions(profileData.prefecture)}
                </select>
              </label>
              <label class="span-2">
                住所（番地まで）
                <input name="addressLine1" type="text" value="${escapeHtml(profileData.addressLine1)}" required />
              </label>
              <label class="span-2">
                住所（ビル名など）
                <input name="addressLine2" type="text" value="${escapeHtml(profileData.addressLine2)}" />
              </label>
            `
              : `
                <label class="span-2">
                  ユーザー名
                  <input name="username" type="text" value="${escapeHtml(profileData.username)}" required />
                </label>
              `
        }
      </div>
      <div class="profile-step-actions">
        ${
          profileFormStep > 1
            ? `
              <button class="secondary-button" id="profileStepBackButton" type="button">
                <i data-lucide="arrow-left"></i>
                戻る
              </button>
            `
            : ""
        }
      </div>
      <button class="primary-button wide" type="submit">
        <i data-lucide="${profileFormStep === 1 ? "arrow-right" : "arrow-right"}"></i>
        ${profileFormStep === 1 ? "次へ" : profileSubmitted ? "個人情報を更新" : "次へ"}
      </button>
    </form>
  `;
  const nextAction = !profileSubmitted || isEditingProfile
    ? `
      ${profileForm}
    `
    : !idSubmitted
      ? `
        <div class="onboarding-action">
          <p class="form-note">マイナンバーカードの表面・裏面の画像と、顔写真を提出してください。</p>
          <form id="idUploadForm" class="id-upload-form">
            <label class="id-upload-label">
              <span>マイナンバーカード（表面）</span>
              <input type="file" id="idFrontInput" accept="image/*" required />
              <span class="id-upload-preview-wrap"><img id="idFrontPreview" class="id-upload-preview" /></span>
            </label>
            <label class="id-upload-label">
              <span>マイナンバーカード（裏面）</span>
              <input type="file" id="idBackInput" accept="image/*" required />
              <span class="id-upload-preview-wrap"><img id="idBackPreview" class="id-upload-preview" /></span>
            </label>
            <label class="id-upload-label">
              <span>顔写真</span>
              <input type="file" id="idFaceInput" accept="image/*" required />
              <span class="id-upload-preview-wrap"><img id="idFacePreview" class="id-upload-preview" /></span>
            </label>
            <button class="primary-button wide" id="submitIdButton" type="submit">
              <i data-lucide="id-card"></i>
              身分証を提出
            </button>
          </form>
          ${editProfileButton}
        </div>
      `
      : !contractIssued
        ? `
          <div class="onboarding-action">
            <p class="form-note">業務委託に関する契約書を交付します。内容を確認して受領してください。受領後、自動で運営へ申請されます。</p>
            <button class="primary-button wide" id="issueContractButton" type="button">
              <i data-lucide="file-signature"></i>
              契約書を受領して運営へ申請
            </button>
            ${editProfileButton}
          </div>
        `
        : !vuzzApplicationSubmitted
          ? `
            <div class="onboarding-action">
              <p class="form-note">契約書まで完了しました。申請が未送信の場合は、運営へ申請してください。</p>
              <button class="primary-button wide" id="submitVuzzApplicationButton" type="button">
                <i data-lucide="send"></i>
                運営へ申請
              </button>
              <button class="secondary-button wide" id="registerLineButton" type="button">
                <i data-lucide="message-circle"></i>
                公式LINEを任意で登録
              </button>
              ${editProfileButton}
            </div>
          `
          : !identityVerified
            ? `
              <div class="onboarding-action">
                <p class="form-note">運営へ申請済みです。承認後に仕事を受けられます。公式LINE登録は任意ですが、連絡がスムーズになります。</p>
                <button class="secondary-button wide" id="registerLineButton" type="button">
                  <i data-lucide="message-circle"></i>
                  ${lineRegistered ? "公式LINE登録済み" : "公式LINEを任意で登録"}
                </button>
                <button class="primary-button wide" id="approveWorkerButton" type="button">
                  <i data-lucide="shield-check"></i>
                  運営承認する
                </button>
                ${editProfileButton}
              </div>
            `
            : `
              <div class="onboarding-action">
                <p class="form-note">運営承認済みです。案件に応募できます。</p>
                <button class="primary-button wide" id="myPageApplyButton" type="button">
                  <i data-lucide="send"></i>
                  選択中の案件に応募
                </button>
                ${editProfileButton}
              </div>
            `;
  const actionTitle = !profileSubmitted
    ? "アカウント情報の入力"
    : isEditingProfile
      ? "個人情報の修正"
    : !idSubmitted
      ? "身分証提出"
      : !contractIssued
        ? "契約書の確認"
        : !vuzzApplicationSubmitted
          ? "運営へ申請"
          : !identityVerified
            ? "運営承認待ち"
            : "応募できます";
  const actionBadgeMarkup =
    isEditingProfile || identityVerified
      ? `
        <span class="status-badge ${identityVerified ? "verified" : ""}">
          ${identityVerified ? "応募可" : "修正中"}
        </span>
      `
      : "";
  const avatarPreview = profileData.avatarUrl
    ? `<img src="${profileData.avatarUrl}" alt="アイコン" class="profile-card-avatar-img" />`
    : `<div class="profile-card-avatar-placeholder">${escapeHtml((profileData.username || profileData.lastName || "?").charAt(0))}</div>`;

  const profileCardHtml = isProfileCardEditing
    ? `
      <article class="portal-panel mypage-card profile-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">profile</p>
            <h2>プロフィール編集</h2>
          </div>
        </div>
        <form id="profileCardForm">
          <div style="display:flex;align-items:center;gap:16px">
            <div class="profile-card-avatar-wrap">${avatarPreview}</div>
            <label class="profile-card-avatar-label">
              <input type="file" id="profileAvatarInput" accept="image/*" style="display:none" />
              <span class="secondary-button" style="cursor:pointer">
                <i data-lucide="camera"></i> アイコンを変更
              </span>
            </label>
          </div>
          <div class="form-grid single-column-fields" style="margin-top:12px">
            <label>
              ユーザー名
              <input name="username" type="text" value="${escapeHtml(profileData.username)}" required />
            </label>
          </div>
          <div class="form-actions" style="margin-top:12px">
            <button class="secondary-button" id="cancelProfileCardButton" type="button">キャンセル</button>
            <button class="primary-button" type="submit">
              <i data-lucide="check"></i> 保存
            </button>
          </div>
        </form>
      </article>
    `
    : `
      <article class="portal-panel mypage-card profile-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">profile</p>
            <h2>プロフィール</h2>
          </div>
          <button class="secondary-button" id="editProfileCardButton" type="button">
            <i data-lucide="pencil"></i> 編集
          </button>
        </div>
        <div class="profile-card-display">
          <div class="profile-card-avatar-wrap">${avatarPreview}</div>
          <div>
            <strong>${escapeHtml(profileData.username || (profileData.lastName && profileData.firstName ? `${profileData.lastName} ${profileData.firstName}` : profileData.lastName || profileData.firstName) || "未設定")}</strong>
            <span>${escapeHtml(getWorkerAuthDisplay())}</span>
          </div>
        </div>
      </article>
    `;

  const applicationsCard = identityVerified
    ? `
      <article class="portal-panel mypage-card applications-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">applications</p>
            <h2>応募ステータス</h2>
          </div>
        </div>
        <div class="review-list">
          ${applicationRows}
        </div>
      </article>
    `
    : "";

  const bankCard = profileSubmitted ? `
    <article class="portal-panel mypage-card bank-card">
      <div class="section-head">
        <div>
          <p class="eyebrow">payment</p>
          <h2>振込口座</h2>
        </div>
        ${bankSubmitted && !isBankEditing ? `<span class="status-badge verified">登録済み</span>` : ""}
      </div>
      ${
        bankSubmitted && !isBankEditing
          ? `
            <div class="bank-info-grid">
              <div><span>金融機関</span><strong>${escapeHtml(bankData.bankName)}</strong></div>
              <div><span>支店名</span><strong>${escapeHtml(bankData.branchName)}</strong></div>
              <div><span>口座種別</span><strong>${escapeHtml(bankData.accountType)}</strong></div>
              <div><span>口座番号</span><strong>${escapeHtml(bankData.accountNumber)}</strong></div>
              <div class="bank-info-full"><span>口座名義</span><strong>${escapeHtml(bankData.holderName)}</strong></div>
            </div>
            <button class="secondary-button wide" id="editBankButton" type="button">
              <i data-lucide="pencil"></i>
              口座情報を変更
            </button>
          `
          : `
            <p class="form-note">報酬の振込先となる口座を登録してください。</p>
            <form class="onboarding-action" id="bankForm">
              <div class="form-grid">
                <label>
                  金融機関名
                  <input name="bankName" type="text" placeholder="例：〇〇銀行" value="${escapeHtml(bankData.bankName)}" required />
                </label>
                <label>
                  支店名
                  <input name="branchName" type="text" placeholder="例：渋谷支店" value="${escapeHtml(bankData.branchName)}" required />
                </label>
                <label>
                  口座種別
                  <select name="accountType" required>
                    <option value="普通" ${bankData.accountType === "普通" ? "selected" : ""}>普通</option>
                    <option value="当座" ${bankData.accountType === "当座" ? "selected" : ""}>当座</option>
                  </select>
                </label>
                <label>
                  口座番号
                  <input name="accountNumber" type="text" inputmode="numeric" placeholder="1234567" maxlength="7" value="${escapeHtml(bankData.accountNumber)}" required />
                </label>
                <label class="span-2">
                  口座名義（カナ）
                  <input name="holderName" type="text" placeholder="ヤマダ タロウ" value="${escapeHtml(bankData.holderName)}" required />
                </label>
              </div>
              ${
                isBankEditing
                  ? `
                    <button class="secondary-button wide" id="cancelBankEditButton" type="button">
                      <i data-lucide="x"></i>
                      キャンセル
                    </button>
                  `
                  : ""
              }
              <button class="primary-button wide" type="submit">
                <i data-lucide="building-2"></i>
                口座を登録
              </button>
            </form>
          `
      }
    </article>
  ` : "";

  const canWithdraw = idSubmitted && bankSubmitted;
  const withdrawalCard = profileSubmitted ? `
    <article class="portal-panel mypage-card withdrawal-card">
      <div class="section-head">
        <div>
          <p class="eyebrow">payout</p>
          <h2>出金申請</h2>
        </div>
        ${withdrawalPending ? `<span class="status-badge pending">申請中</span>` : ""}
      </div>
      ${
        !idSubmitted
          ? `
            <div class="withdrawal-locked">
              <i data-lucide="lock"></i>
              <p>身分証を提出するまで出金申請はできません。</p>
              <span class="withdrawal-lock-hint">「次のアクション」から身分証の提出を完了してください。</span>
            </div>
          `
          : !bankSubmitted
          ? `
            <div class="withdrawal-locked">
              <i data-lucide="lock"></i>
              <p>振込口座を登録するまで出金申請はできません。</p>
              <span class="withdrawal-lock-hint">下の「振込口座」カードから口座情報を登録してください。</span>
            </div>
          `
          : withdrawalPending
          ? `
            <div class="withdrawal-pending-info">
              <i data-lucide="clock"></i>
              <p>出金申請を受け付けました。処理までお待ちください。</p>
            </div>
            <button class="secondary-button wide" id="cancelWithdrawalButton" type="button">
              <i data-lucide="x"></i>
              申請を取り消す
            </button>
          `
          : `
            <div class="bank-info-grid withdrawal-bank-preview">
              <div><span>振込先</span><strong>${escapeHtml(bankData.bankName)} ${escapeHtml(bankData.branchName)}</strong></div>
              <div><span>口座番号</span><strong>${escapeHtml(bankData.accountType)} ${escapeHtml(bankData.accountNumber)}</strong></div>
              <div class="bank-info-full"><span>口座名義</span><strong>${escapeHtml(bankData.holderName)}</strong></div>
            </div>
            <form class="onboarding-action" id="withdrawalForm">
              <label class="withdrawal-amount-label">
                出金希望額（円）
                <div class="withdrawal-amount-wrap">
                  <span class="withdrawal-yen">¥</span>
                  <input
                    name="amount"
                    type="number"
                    inputmode="numeric"
                    min="1000"
                    step="1000"
                    placeholder="10000"
                    class="withdrawal-amount-input"
                    required
                  />
                </div>
                <small class="withdrawal-hint">1,000円単位で入力してください（最低1,000円）</small>
              </label>
              <button class="primary-button wide" type="submit">
                <i data-lucide="send"></i>
                出金を申請する
              </button>
            </form>
          `
      }
      ${withdrawalHistory.length > 0 ? `
        <div class="withdrawal-history">
          <p class="eyebrow" style="margin-top:1rem">申請履歴</p>
          ${withdrawalHistory.map(h => `
            <div class="withdrawal-history-item">
              <span>${h.date}</span>
              <strong>¥${h.amount.toLocaleString("ja-JP")}</strong>
              <span class="status-badge ${h.status === "完了" ? "verified" : "pending"}">${h.status}</span>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </article>
  ` : "";

  feed.innerHTML = `
    ${alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="mypage-grid ${profileSubmitted ? "" : "profile-required"}">
      ${profileSubmitted ? profileCardHtml : ""}

      <article class="portal-panel mypage-card action-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">next action</p>
            <h2>${actionTitle}</h2>
          </div>
          ${actionBadgeMarkup}
        </div>
        ${nextAction}
      </article>

      ${identityVerified ? `<article class="portal-panel mypage-card membership-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">member rank</p>
            <h2>${rewardSummary.currentRank.label}</h2>
          </div>
          <span class="status-badge verified">${rewardSummary.points.toLocaleString("ja-JP")}pt</span>
        </div>
        <div class="rank-overview">
          <div>
            <span>ログイン日数</span>
            <strong>${rewardSummary.loginDayCount.toLocaleString("ja-JP")}日</strong>
          </div>
          <div>
            <span>完了案件数</span>
            <strong>${completedJobCount.toLocaleString("ja-JP")}件</strong>
          </div>
          <div>
            <span>次のランク</span>
            <strong>${nextRankText}</strong>
          </div>
        </div>
        <div class="rank-progress" aria-label="ランク進捗">
          <span style="width:${rewardSummary.rankProgress}%"></span>
        </div>
        <div class="rank-ladder">
          ${rewardSummary.ranks
            .map(
              (rank) => `
                <div class="rank-tier ${rank.id} ${rewardSummary.currentRank.id === rank.id ? "active" : ""} ${rewardSummary.points >= rank.threshold ? "unlocked" : ""}">
                  <i data-lucide="${rank.id === "bronze" ? "medal" : rank.id === "silver" ? "badge" : "crown"}"></i>
                  <strong>${rank.label}</strong>
                  <span>${rank.threshold.toLocaleString("ja-JP")}pt〜</span>
                </div>
              `,
            )
            .join("")}
        </div>
        <div class="reward-list">
          ${rewardSummary.rewards
            .map(
              (reward) => `
                <div class="reward-item ${rewardSummary.points >= reward.threshold ? "unlocked" : ""}">
                  <i data-lucide="${rewardSummary.points >= reward.threshold ? "gift" : "lock"}"></i>
                  <div>
                    <strong>${reward.label}</strong>
                    <span>${reward.threshold.toLocaleString("ja-JP")}ptで獲得</span>
                  </div>
                  <b>${rewardSummary.points >= reward.threshold ? "獲得済み" : "未達成"}</b>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>` : ""}

      ${applicationsCard}
      ${bankCard}
      ${withdrawalCard}
    </section>
  `;

  document.querySelector("#profileForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    if (profileFormStep === 1) {
      profileData.lastName = formData.get("lastName")?.toString().trim() || "";
      profileData.firstName = formData.get("firstName")?.toString().trim() || "";
      profileData.kanaLast = formData.get("kanaLast")?.toString().trim() || "";
      profileData.kanaFirst = formData.get("kanaFirst")?.toString().trim() || "";
      profileData.birthdate = parseBirthdate(formData);
      profileData.gender = formData.get("gender")?.toString() || "";
      profileFormStep = 2;
      updateIdentityUI();
      renderMyPage("続けて住所を入力してください。");
      return;
    }
    if (profileFormStep === 2) {
      const rawPostal = toHalfWidth(formData.get("postalCode")?.toString().trim() || "").replace(/-/g, "");
      if (!/^[0-9]{7}$/.test(rawPostal)) {
        renderMyPage("郵便番号は数字7桁で入力してください。");
        return;
      }
      profileData.postalCode = rawPostal;
      profileData.prefecture = formData.get("prefecture")?.toString().trim() || "";
      profileData.addressLine1 = formData.get("addressLine1")?.toString().trim() || "";
      profileData.addressLine2 = formData.get("addressLine2")?.toString().trim() || "";
      profileData.address = [profileData.prefecture, profileData.addressLine1, profileData.addressLine2].filter(Boolean).join("");
      profileFormStep = 3;
      renderMyPage();
      return;
    }
  });
  document.querySelector("#profileStepBackButton")?.addEventListener("click", () => {
    profileFormStep = Math.max(profileFormStep - 1, 1);
    renderMyPage();
  });
  const postalInput = document.querySelector('#profileForm input[name="postalCode"]');
  postalInput?.addEventListener("input", () => {
    postalInput.value = toHalfWidth(postalInput.value).replace(/-/g, "");
  });
  document.querySelector("#editProfileButton")?.addEventListener("click", () => {
    isEditingProfile = true;
    profileFormStep = 1;
    renderMyPage("個人情報を修正できます。保存すると元の手続きに戻ります。");
  });
  const idUploadForm = document.querySelector("#idUploadForm");
  if (idUploadForm) {
    ["Front", "Back", "Face"].forEach((key) => {
      const input = document.getElementById(`id${key}Input`);
      const preview = document.getElementById(`id${key}Preview`);
      input?.addEventListener("change", () => {
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      });
    });
    idUploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const frontFile = document.getElementById("idFrontInput")?.files?.[0];
      const backFile = document.getElementById("idBackInput")?.files?.[0];
      const faceFile = document.getElementById("idFaceInput")?.files?.[0];
      if (!frontFile || !backFile || !faceFile) {
        alert("3枚すべての画像を選択してください。");
        return;
      }
      const readFile = (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        });
      Promise.all([readFile(frontFile), readFile(backFile), readFile(faceFile)]).then(
        ([front, back, face]) => {
          idImages = { front, back, face };
          idSubmitted = true;
          upsertRegisteredWorker();
          updateIdentityUI();
          renderMyPage("身分証を提出しました。続けて契約書を確認してください。");
        },
      );
    });
  }
  document.querySelector("#issueContractButton")?.addEventListener("click", () => {
    contractIssued = true;
    vuzzApplicationSubmitted = true;
    updateIdentityUI();
    renderMyPage("契約書を受領しました。運営へ申請しました。");
  });
  document.querySelector("#submitVuzzApplicationButton")?.addEventListener("click", () => {
    vuzzApplicationSubmitted = true;
    updateIdentityUI();
    renderMyPage("運営へ申請しました。承認をお待ちください。");
  });
  document.querySelector("#registerLineButton")?.addEventListener("click", () => {
    lineRegistered = true;
    updateIdentityUI();
    renderMyPage("公式LINE登録が完了しました。これは任意項目です。");
  });
  document.querySelector("#approveWorkerButton")?.addEventListener("click", () => {
    identityVerified = true;
    upsertRegisteredWorker();
    updateIdentityUI();
    renderMyPage("運営承認が完了しました。仕事を受けられます。");
  });
  document.querySelector("#myPageApplyButton")?.addEventListener("click", () => {
    if (!identityVerified) {
      renderMyPage("応募するには運営承認が必要です。");
      return;
    }
    applyToJob(selectedJobId);
    renderMyPage("選択中の案件に応募しました。");
  });
  document.querySelector("#bankForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    bankData.bankName = formData.get("bankName")?.toString().trim() || "";
    bankData.branchName = formData.get("branchName")?.toString().trim() || "";
    bankData.accountType = formData.get("accountType")?.toString() || "普通";
    bankData.accountNumber = formData.get("accountNumber")?.toString().trim() || "";
    bankData.holderName = formData.get("holderName")?.toString().trim() || "";
    bankSubmitted = true;
    isBankEditing = false;
    renderMyPage("振込口座を登録しました。");
  });
  document.querySelector("#editBankButton")?.addEventListener("click", () => {
    isBankEditing = true;
    renderMyPage();
  });
  document.querySelector("#cancelBankEditButton")?.addEventListener("click", () => {
    isBankEditing = false;
    renderMyPage();
  });

  document.querySelector("#editProfileCardButton")?.addEventListener("click", () => {
    isProfileCardEditing = true;
    renderMyPage();
  });
  document.querySelector("#cancelProfileCardButton")?.addEventListener("click", () => {
    isProfileCardEditing = false;
    renderMyPage();
  });
  document.querySelector("#profileCardForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    profileData.username = formData.get("username")?.toString().trim() || "";
    isProfileCardEditing = false;
    updateIdentityUI();
    renderMyPage("プロフィールを更新しました。");
  });
  document.querySelector("#profileAvatarInput")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      profileData.avatarUrl = e.target.result;
      const wrap = document.querySelector(".profile-card-avatar-wrap");
      if (wrap) {
        wrap.innerHTML = `<img src="${profileData.avatarUrl}" alt="アイコン" class="profile-card-avatar-img" />`;
      }
      updateIdentityUI();
    };
    reader.readAsDataURL(file);
  });
  document.querySelector("#withdrawalForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    const amount = parseInt(formData.get("amount")?.toString() || "0", 10);
    if (amount < 1000) {
      renderMyPage("出金額は1,000円以上を入力してください。");
      return;
    }
    const now = new Date();
    const date = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
    withdrawalHistory.unshift({ date, amount, status: "申請中" });
    withdrawalPending = true;
    renderMyPage(`¥${amount.toLocaleString("ja-JP")} の出金申請を受け付けました。`);
  });
  document.querySelector("#cancelWithdrawalButton")?.addEventListener("click", () => {
    if (withdrawalHistory.length > 0) withdrawalHistory[0].status = "取消";
    withdrawalPending = false;
    renderMyPage("出金申請を取り消しました。");
  });
  refreshIcons();
}

function bindGuestTopbarButtons() {
  document.querySelector("#topbarLoginButton")?.addEventListener("click", showLogin);
  document.querySelector("#topbarRegisterButton")?.addEventListener("click", () => {
    showRole("worker");
    renderRegistrationForm("", "signup");
  });
}

function showLogin() {
  showRole("worker");
  renderRegistrationForm();
}

function showRole(role) {
  if (role === "vuzz" && !isVuzzLoggedIn) {
    renderVuzzLogin();
    return;
  }
  if (role === "company" && !currentCompanyAccount) {
    renderCompanyLogin();
    return;
  }
  loginView.classList.add("is-hidden");
  Object.entries(appViews).forEach(([viewRole, view]) => {
    view.classList.toggle("is-hidden", viewRole !== role);
  });
  window.location.hash = role;
  if (role === "company") {
    updateCompanyPortalIdentity();
  }
  refreshIcons();
}

function renderVuzzLogin(alertText = "") {
  loginView.classList.remove("is-hidden");
  Object.values(appViews).forEach((view) => view.classList.add("is-hidden"));
  pendingLoginRole = null;
  pendingLoginMethod = null;
  window.location.hash = "vuzz";
  setLoginStep("vuzzAuth");
  const alert = document.getElementById("vuzzLoginAlert");
  if (alert) {
    alert.textContent = alertText;
    alert.classList.toggle("is-hidden", !alertText);
  }
  setupPasswordInputs(loginView);
  setupEmailValidation(loginView);
  refreshIcons();
}

function resetWorkerVerification() {
  isLoggedIn = true;
  emailVerified = true;
  recordWorkerLogin();
  profileSubmitted = false;
  idSubmitted = false;
  contractIssued = false;
  lineRegistered = false;
  vuzzApplicationSubmitted = false;
  identityVerified = false;
  isEditingProfile = false;
  profileFormStep = 1;
  updateIdentityUI();
}

function applyExistingWorkerProfile(displayEmail = "") {
  profileData.lastName = profileData.lastName || "登録済み";
  profileData.firstName = profileData.firstName || "ユーザー";
  profileData.kanaLast = profileData.kanaLast || "トウロクズミ";
  profileData.kanaFirst = profileData.kanaFirst || "ユーザー";
  profileData.birthdate = profileData.birthdate || "1990-01-01";
  profileData.postalCode = profileData.postalCode || "100-0001";
  profileData.prefecture = profileData.prefecture || "東京都";
  profileData.addressLine1 = profileData.addressLine1 || "千代田区千代田1-1";
  profileData.addressLine2 = profileData.addressLine2 || "";
  profileData.username = profileData.username || (displayEmail ? displayEmail.split("@")[0] : "homeworker");
  profileData.address = [profileData.prefecture, profileData.addressLine1, profileData.addressLine2].filter(Boolean).join("");
}

function loginExistingWorker(displayEmail = "ログイン済み") {
  workerAuthEmail = displayEmail;
  resetWorkerVerification();
  applyExistingWorkerProfile(displayEmail.includes("@") ? displayEmail : "");
  profileSubmitted = true;
  upsertRegisteredWorker();
  updateIdentityUI();
  showRole("worker");
  renderMyPage("ログインしました。マイページを表示しています。");
}

const loginSteps = ["role", "method", "email", "vuzzAuth", "companyAuth", "workerProfile", "companyProfile"];
const loginStepIds = {
  role: "loginStepRole",
  method: "loginStepMethod",
  email: "loginStepEmail",
  vuzzAuth: "loginStepVuzzAuth",
  companyAuth: "loginStepCompanyAuth",
  workerProfile: "loginStepWorkerProfile",
  companyProfile: "loginStepCompanyProfile",
};

function setLoginStep(step) {
  loginSteps.forEach((name) => {
    const el = document.getElementById(loginStepIds[name]);
    if (!el) return;
    el.classList.toggle("is-hidden", name !== step);
  });
  if (step === "workerProfile") {
    document.getElementById("workerProfileGateEmail").textContent = getWorkerAuthDisplay();
    populateBirthdateSelects(document.getElementById("workerProfileGate"));
    setWorkerProfileGateStep(1);
  }
  refreshIcons();
}

function setWorkerProfileGateStep(step) {
  document.querySelectorAll("[data-profile-gate-step]").forEach((section) => {
    section.classList.toggle("is-hidden", section.dataset.profileGateStep !== String(step));
  });
  refreshIcons();
}

function profileStepFor(role) {
  if (role === "worker") return "workerProfile";
  if (role === "company") return "companyProfile";
  return null;
}

function startRegistrationFlow(role) {
  pendingLoginRole = role;
  pendingLoginMethod = null;
  if (role === "worker") {
    workerAuthEmail = "";
    profileFormStep = 1;
  }
  if (role === "company") {
    renderCompanyLogin();
    return;
  }
  const heading = document.getElementById("methodHeading");
  if (heading) {
    heading.textContent = role === "company" ? "企業として登録方法を選択" : "ワーカーとして登録方法を選択";
  }
  setLoginStep("method");
}

function renderCompanyLogin(alertText = "") {
  pendingLoginRole = "company";
  pendingLoginMethod = "email";
  setLoginStep("companyAuth");
  const alert = document.getElementById("companyLoginAlert");
  if (alert) {
    alert.textContent = alertText;
    alert.classList.toggle("is-hidden", !alertText);
  }
  setupPasswordInputs(loginView);
  setupEmailValidation(loginView);
  refreshIcons();
}

function chooseAuthMethod(method) {
  pendingLoginMethod = method;
  setLoginStep("email");
}

function completeAuthentication() {
  isLoggedIn = true;
  emailVerified = true;
  if (pendingLoginRole === "worker") {
    resetWorkerVerification();
    isLoggedIn = true;
    emailVerified = true;
  }
  const next = profileStepFor(pendingLoginRole);
  if (!next) {
    enterRoleApp();
    return;
  }
  setLoginStep(next);
}

function enterRoleApp() {
  const role = pendingLoginRole;
  pendingLoginRole = null;
  pendingLoginMethod = null;
  setLoginStep("role");
  if (role === "worker") {
    activeChannel = "all";
    activePriceTier = "all";
    activeCategory = "all";
    activeFilter = "all";
    document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
    document.querySelector("#workerApp .channel[data-channel='all']")?.classList.add("active");
    document.querySelectorAll("#workerApp .filter").forEach((item) => {
      item.classList.toggle("active", item.dataset.filter === activeFilter);
    });
    feedNotice = "完了しました。案件一覧へ移動しました。";
    showRole("worker");
    renderFeed();
  } else if (role === "company") {
    showRole("company");
  } else {
    showRole(role);
  }
}

function getCompanyDisplayName(account = currentCompanyAccount) {
  return account?.companyName || account?.email?.split("@")[0] || "企業ページ";
}

function updateCompanyPortalIdentity() {
  const displayName = getCompanyDisplayName();
  const avatar = document.querySelector("#companyApp .worker-card .worker-avatar");
  const name = document.querySelector("#companyApp .worker-card strong");
  const status = document.querySelector("#companyApp .worker-card span:not(.presence)");
  if (avatar) avatar.textContent = displayName.charAt(0);
  if (name) name.textContent = displayName;
  if (status) status.textContent = currentCompanyAccount ? "企業ログイン済み・掲載可" : "企業確認済み・掲載可";
}

function loginCompanyAccount(email, password) {
  const account = companyAccounts.find((item) => item.email === email && item.password === password);
  if (!account) {
    renderCompanyLogin("メールアドレスまたはパスワードが違います。");
    return;
  }
  currentCompanyAccount = { ...account };
  companyData.companyName = account.companyName || getCompanyDisplayName(account);
  companyProfileSubmitted = true;
  pendingLoginRole = null;
  pendingLoginMethod = null;
  setLoginStep("role");
  showRole("company");
}

function enterDemoCompany() {
  currentCompanyAccount = {
    companyName: "白樺文具株式会社",
    email: "demo-company@example.com",
    password: "",
  };
  companyData.companyName = currentCompanyAccount.companyName;
  companyProfileSubmitted = true;
  showRole("company");
}

function getPayAmount(job) {
  return Number(job.pay.replace(/[^\d]/g, "")) || 0;
}

function getJobPriceTier(job) {
  const amount = getPayAmount(job);
  return (
    Object.entries(priceTiers).find(([key, tier]) => key !== "all" && amount >= tier.min && amount <= tier.max)?.[0] ||
    "all"
  );
}

function matchesPriceAndCategory(job, priceTier = activePriceTier, category = activeCategory) {
  const priceMatch = priceTier === "all" || getJobPriceTier(job) === priceTier;
  const categoryMatch = category === "all" || job.channel === category;
  return priceMatch && categoryMatch;
}

function getActiveChannelLabel() {
  if (activeChannel === "jobs") {
    const priceLabel = priceTiers[activePriceTier]?.label || "案件";
    const categoryLabel = categories[activeCategory] || "すべて";
    return `${priceLabel} / ${categoryLabel}`;
  }

  return channels[activeChannel] || "すべての案件";
}

function updateChannelCounts() {
  allJobsCount.textContent = jobs.length;
  savedCount.textContent = savedJobs.size;
  document.querySelectorAll("[data-category-total-count]").forEach((countNode) => {
    const category = countNode.dataset.categoryTotalCount;
    countNode.textContent = jobs.filter((job) => category === "all" || job.channel === category).length;
  });
  document.querySelectorAll("[data-channel-count]").forEach((countNode) => {
    const priceTier = countNode.dataset.priceTier;
    const category = countNode.dataset.category;
    countNode.textContent = jobs.filter((job) => matchesPriceAndCategory(job, priceTier, category)).length;
  });
}

function updateCategoryChoices() {
  document.querySelectorAll("[data-category-shortcut]").forEach((button) => {
    const isActive =
      activeChannel === "jobs" &&
      activePriceTier === "all" &&
      activeCategory === button.dataset.categoryShortcut;
    button.classList.toggle("active", isActive);
  });
}

function getVisibleJobs() {
  const query = searchInput?.value.trim().toLowerCase() || "";

  return jobs.filter((job) => {
    const channelMatch =
      activeChannel === "all" ||
      (activeChannel === "saved" && savedJobs.has(job.id)) ||
      (activeChannel === "jobs" && matchesPriceAndCategory(job));
    const filterMatch =
      activeFilter === "all" ||
      (activeFilter === "saved" && savedJobs.has(job.id)) ||
      job.tags.includes(activeFilter);
    const queryMatch =
      !query ||
      [job.company, job.title, job.description, job.pay, job.badge]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return channelMatch && filterMatch && queryMatch;
  });
}

function renderSupportChannel() {
  const canWrite = writableChannels.has(activeChannel);
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.toggle("is-hidden", !canWrite);
  channelMessageInput.placeholder = `#${channels[activeChannel]} にメッセージを送信`;

  if (activeChannel === "ai") {
    feedIntroText.textContent =
      "運営AIに案件選びや応募前の不安を相談できます。外部送信のないプロトタイプ用チャットです。";
    feed.innerHTML = aiMessages
      .map(
        (message) => `
          <article class="support-message ai-chat-message">
            <div class="avatar" style="background:${message.color}">${escapeHtml(message.avatar)}</div>
            <div class="message-body">
              <div class="message-head">
                <strong>${escapeHtml(message.author)}</strong>
                <time>${escapeHtml(message.time)}</time>
              </div>
              <h3>${escapeHtml(message.title)}</h3>
              <p>${escapeHtml(message.body)}</p>
            </div>
          </article>
        `,
      )
      .join("");
    refreshIcons();
    return;
  }

  if (activeChannel === "guide") {
    feedIntroText.textContent =
      "応募から納品、検収、報酬受け取りまでの流れを確認できます。このチャンネルは読み取り専用です。";
    feed.innerHTML = `
      <article class="support-message">
        <div class="avatar" style="background:#48b58c">運</div>
        <div class="message-body">
          <div class="message-head"><strong>運営ガイド</strong><time>固定</time><span class="badge">READ ONLY</span></div>
          <h3>はじめての流れ</h3>
          <p>1. 案件を選ぶ、2. 条件を確認する、3. 応募する、4. 納品する、5. 検収後に報酬を受け取る、という順番で進みます。</p>
        </div>
      </article>
      <article class="support-message">
        <div class="avatar" style="background:#f0b84b">!</div>
        <div class="message-body">
          <div class="message-head"><strong>安全チェック</strong><time>固定</time></div>
          <h3>不明点は応募前に確認</h3>
          <p>納期、作業量、検収条件、送料、個人情報の扱いが曖昧な案件は、応募前に質問してください。</p>
        </div>
      </article>
    `;
    refreshIcons();
    return;
  }

  feedIntroText.textContent =
    "案件についての質問や、作業前の相談を投稿できます。案件そのものは企業だけが投稿できます。";
  feed.innerHTML = supportMessages
    .map(
      (message) => `
        <article class="support-message">
          <div class="avatar" style="background:${message.color}">${message.avatar}</div>
          <div class="message-body">
            <div class="message-head">
              <strong>${message.author}</strong>
              <time>${message.time}</time>
            </div>
            <h3>${message.title}</h3>
            <p>${message.body}</p>
          </div>
        </article>
      `,
    )
    .join("");
  refreshIcons();
}

function renderFeed() {
  const channelLabel = getActiveChannelLabel();
  channelTitle.textContent = channelLabel;
  feedTitle.textContent = activeChannel === "ai" ? "AI相談ルーム" : `#${channelLabel} 一覧`;
  workerMainGrid.classList.toggle("support-mode", supportChannels.has(activeChannel));
  filterRow?.classList.toggle("is-hidden", supportChannels.has(activeChannel));
  channelComposer.classList.toggle("is-hidden", !writableChannels.has(activeChannel));
  aiRoomButton.classList.toggle("active", activeChannel === "ai");
  updateChannelCounts();
  updateCategoryChoices();

  if (supportChannels.has(activeChannel)) {
    renderSupportChannel();
    return;
  }

  feedIntroText.textContent =
    "価格帯ごとに案件を並べ、各価格帯の中でカテゴリ別に確認できます。カテゴリから探す一覧で見たい仕事だけに切り替えられます。";
  const visibleJobs = getVisibleJobs();
  const noticeHtml = feedNotice ? `<div class="mypage-alert">${feedNotice}</div>` : "";
  feedNotice = "";

  if (!visibleJobs.length) {
    feed.innerHTML = `
      ${noticeHtml}
      <article class="job-message">
        <div class="avatar" style="background:#454952;color:#f5f6f8">?</div>
        <div class="message-body">
          <div class="message-head"><strong>システム</strong><time>now</time></div>
          <h3>条件に合う案件がありません</h3>
          <p>検索条件やフィルターを変えると、別の案件が表示されます。</p>
        </div>
      </article>
    `;
    return;
  }

  if (!visibleJobs.some((job) => job.id === selectedJobId)) {
    selectedJobId = visibleJobs[0].id;
    renderDetail(visibleJobs[0]);
  }

  feed.innerHTML = noticeHtml + visibleJobs
    .map(
      (job) => `
        <article class="job-message ${job.id === selectedJobId ? "selected" : ""}" data-id="${job.id}">
          <div class="avatar" style="background:${job.color}">${job.logo}</div>
          <div class="message-body">
            <div class="message-head">
              <strong>${job.company}</strong>
              <time>${job.posted}</time>
              <span class="badge">${job.badge}</span>
            </div>
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <div class="job-meta">
              <span>${job.pay}</span>
              <span>納期 ${job.due}</span>
              <span>${job.place}</span>
              <span>${job.slots}</span>
            </div>
            <div class="job-actions">
              <button class="mini-button" data-action="detail" data-id="${job.id}" type="button">詳細を見る</button>
              ${
                isLoggedIn
                  ? `
                    <button class="mini-button ${savedJobs.has(job.id) ? "active" : ""}" data-action="save" data-id="${job.id}" type="button">
                      ${savedJobs.has(job.id) ? "保存済み" : "保存"}
                    </button>
                    <button class="mini-button" data-action="apply" data-id="${job.id}" type="button">
                      ${getWorkerApprovalLabel()}
                    </button>
                  `
                  : ""
              }
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderDetail(job) {
  selectedJobId = job.id;
  document.querySelector("#detailTitle").textContent = job.title;
  document.querySelector("#detailLogo").textContent = job.logo;
  document.querySelector("#detailLogo").style.background = job.color;
  document.querySelector("#detailCompany").textContent = job.company;
  document.querySelector("#detailTrust").textContent = job.trust;
  document.querySelector("#detailPay").textContent = job.pay;
  document.querySelector("#detailDue").textContent = `納期: ${job.due}`;
  document.querySelector("#detailPlace").textContent = job.place;
  document.querySelector("#detailSlots").textContent = job.slots;
  document.querySelector("#detailTime").textContent = job.time;
  document.querySelector("#detailReview").textContent = job.review;
  saveCurrent.classList.toggle("active", savedJobs.has(job.id));
  saveCurrent.classList.toggle("is-hidden", !isLoggedIn);
  updateIdentityUI();
}

function selectJob(id) {
  const job = jobs.find((item) => item.id === id);
  if (!job) return;
  renderDetail(job);
  renderFeed();
}

function toggleSave(id) {
  if (!isLoggedIn) {
    renderRegistrationForm("保存するにはログインまたは会員登録が必要です。");
    return;
  }
  if (savedJobs.has(id)) {
    savedJobs.delete(id);
  } else {
    savedJobs.add(id);
  }
  renderFeed();
  const selected = jobs.find((job) => job.id === selectedJobId);
  if (selected) renderDetail(selected);
}

document.querySelectorAll("#workerApp .channel").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeChannel = button.dataset.channel;
    activePriceTier = button.dataset.priceTier || "all";
    activeCategory = button.dataset.category || "all";
    renderFeed();
    closeAppPanel(button.closest(".app-shell"));
  });
});

document.querySelectorAll("[data-category-shortcut]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
    activeChannel = "jobs";
    activePriceTier = "all";
    activeCategory = button.dataset.categoryShortcut;
    renderFeed();
    closeAppPanel(button.closest(".app-shell"));
  });
});

aiRoomButton.addEventListener("click", () => {
  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  activeChannel = "ai";
  activePriceTier = "all";
  activeCategory = "all";
  closeUtilityPopover();
  renderFeed();
  channelMessageInput.focus();
});

document.querySelectorAll("#workerApp .filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#workerApp .filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderFeed();
  });
});

document.querySelectorAll("#vuzzApp [data-vuzz-channel]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("#vuzzApp [data-vuzz-channel]")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderVuzzChannel(button.dataset.vuzzChannel);
  });
});

feed.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  const message = event.target.closest(".job-message[data-id]");

  if (actionButton) {
    const id = Number(actionButton.dataset.id);
    if (actionButton.dataset.action === "save") toggleSave(id);
    if (actionButton.dataset.action === "detail") {
      if (!isLoggedIn) {
        showLoginRequired();
        return;
      }
      selectJob(id);
    }
    if (actionButton.dataset.action === "apply") {
      selectJob(id);
      applyToJob(id);
    }
    return;
  }

  if (message) selectJob(Number(message.dataset.id));
});

searchInput?.addEventListener("input", renderFeed);

saveCurrent.addEventListener("click", () => {
  toggleSave(selectedJobId);
});

document.querySelector("#applyButton").addEventListener("click", () => {
  applyToJob(selectedJobId);
});

const openPostModalButton = document.querySelector("#openPostModal");
if (openPostModalButton) {
  openPostModalButton.addEventListener("click", () => {
    postModal.showModal();
  });
}

document.querySelector("#submitModalJob").addEventListener("click", () => {
  const title = document.querySelector("#modalTitle").value.trim();
  if (!title) return;

  const channel = document.querySelector("#modalChannel").value;
  const newJob = {
    id: Date.now(),
    channel,
    company: "サンプル企業",
    logo: "企",
    color: "#48b58c",
    title,
    description: document.querySelector("#modalDescription").value.trim(),
    pay: document.querySelector("#modalPay").value.trim() || "応相談",
    due: "5月8日",
    place: "完全在宅",
    slots: "あと5名",
    time: "約3時間",
    review: "納品後24時間以内",
    trust: "企業確認済み",
    badge: "新着",
    tags: ["remote", "beginner"],
    posted: "now",
  };

  jobs.unshift(newJob);
  activeChannel = "all";
  activePriceTier = "all";
  activeCategory = "all";
  document.querySelectorAll("#workerApp .channel").forEach((item) => {
    item.classList.toggle("active", item.dataset.channel === "all");
  });
  aiRoomButton.classList.remove("active");
  renderDetail(newJob);
  renderFeed();
});

channelComposer.addEventListener("submit", (event) => {
  event.preventDefault();
  const body = channelMessageInput.value.trim();
  if (!body || !writableChannels.has(activeChannel)) return;

  if (activeChannel === "ai") {
    aiMessages.push({
      author: "佐藤 美咲",
      avatar: "美",
      color: "#58a9df",
      time: "now",
      title: body,
      body: "送信済み",
    });
    aiMessages.push({
      author: "運営AI",
      avatar: "AI",
      color: "#b9a7ff",
      time: "now",
      title: "AI回答",
      body: getAiReply(body),
    });
    channelMessageInput.value = "";
    renderFeed();
    feed.scrollTop = feed.scrollHeight;
    return;
  }

  supportMessages.push({
    author: "佐藤 美咲",
    avatar: "美",
    color: "#58a9df",
    time: "now",
    title: body,
    body: "送信済み",
  });
  channelMessageInput.value = "";
  renderFeed();
  feed.scrollTop = feed.scrollHeight;
});

openMyPageButton.addEventListener("click", () => {
  document.getElementById("loginRequiredPopup")?.classList.remove("is-visible");
  renderMyPage();
});

notificationsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  renderUtilityPopover("notifications");
});

settingsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  renderUtilityPopover("settings");
});

utilityPopover.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.querySelectorAll("[data-login-role]").forEach((button) => {
  button.addEventListener("click", () => {
    const role = button.dataset.loginRole;
    if (role === "vuzz") isVuzzLoggedIn = false;
    if (role === "vuzz") {
      renderVuzzLogin();
      return;
    }
    startRegistrationFlow(role);
  });
});

document.querySelectorAll("[data-login-back]").forEach((button) => {
  button.addEventListener("click", () => {
    setLoginStep(button.dataset.loginBack);
  });
});

document.getElementById("chooseEmailButton")?.addEventListener("click", () => chooseAuthMethod("email"));

document.getElementById("vuzzLoginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  normalizePasswordInputs(event.currentTarget);
  if (!event.currentTarget.reportValidity()) return;
  const formData = new FormData(event.currentTarget);
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  if (email !== vuzzAdminCredentials.email || password !== vuzzAdminCredentials.password) {
    renderVuzzLogin("メールアドレスまたはパスワードが違います。");
    return;
  }
  isVuzzLoggedIn = true;
  showRole("vuzz");
  renderVuzzChannel("review");
});

document.getElementById("companyLoginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  normalizePasswordInputs(event.currentTarget);
  if (!event.currentTarget.reportValidity()) return;
  const formData = new FormData(event.currentTarget);
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  loginCompanyAccount(email, password);
});

document.getElementById("backToWorkerFromVuzzLogin")?.addEventListener("click", () => {
  showRole("worker");
  renderFeed();
});

document.getElementById("devBypassAdmin")?.addEventListener("click", () => {
  isVuzzLoggedIn = true;
  showRole("vuzz");
  renderVuzzChannel("review");
});

document.getElementById("devBypassCompany")?.addEventListener("click", () => {
  enterDemoCompany();
});

document.getElementById("emailRegisterForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  workerAuthEmail = formData.get("email")?.toString().trim() || "メール認証済み";
  completeAuthentication();
});

document.getElementById("workerProfileGateNext")?.addEventListener("click", () => {
  const form = document.getElementById("workerProfileGate");
  const firstStep = form?.querySelector("[data-profile-gate-step='1']");
  if (!form || !firstStep) return;
  const firstInputs = firstStep.querySelectorAll("input");
  if (![...firstInputs].every((input) => input.reportValidity())) return;
  const formData = new FormData(form);
  profileData.lastName = formData.get("lastName")?.toString().trim() || "";
  profileData.firstName = formData.get("firstName")?.toString().trim() || "";
  profileData.kanaLast = formData.get("kanaLast")?.toString().trim() || "";
  profileData.kanaFirst = formData.get("kanaFirst")?.toString().trim() || "";
  profileData.birthdate = formData.get("birthdate")?.toString() || "";
  setWorkerProfileGateStep(2);
});

document.getElementById("workerProfileGateBack")?.addEventListener("click", () => {
  setWorkerProfileGateStep(1);
});

document.getElementById("workerProfileGateAddressNext")?.addEventListener("click", () => {
  const form = document.getElementById("workerProfileGate");
  const addressStep = form?.querySelector("[data-profile-gate-step='2']");
  if (!form || !addressStep) return;
  const addressInputs = addressStep.querySelectorAll("input, select");
  if (![...addressInputs].every((input) => input.reportValidity())) return;
  const formData = new FormData(form);
  profileData.postalCode = formData.get("postalCode")?.toString().trim() || "";
  profileData.prefecture = formData.get("prefecture")?.toString().trim() || "";
  profileData.addressLine1 = formData.get("addressLine1")?.toString().trim() || "";
  profileData.addressLine2 = formData.get("addressLine2")?.toString().trim() || "";
  profileData.address = [profileData.prefecture, profileData.addressLine1, profileData.addressLine2].filter(Boolean).join("");
  setWorkerProfileGateStep(3);
});

document.getElementById("workerProfileGateAddressBack")?.addEventListener("click", () => {
  setWorkerProfileGateStep(2);
});

document.getElementById("workerProfileGate")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  profileData.lastName = formData.get("lastName")?.toString().trim() || "";
  profileData.firstName = formData.get("firstName")?.toString().trim() || "";
  profileData.kanaLast = formData.get("kanaLast")?.toString().trim() || "";
  profileData.kanaFirst = formData.get("kanaFirst")?.toString().trim() || "";
  profileData.birthdate = formData.get("birthdate")?.toString() || "";
  profileData.postalCode = formData.get("postalCode")?.toString().trim() || "";
  profileData.prefecture = formData.get("prefecture")?.toString().trim() || "";
  profileData.addressLine1 = formData.get("addressLine1")?.toString().trim() || "";
  profileData.addressLine2 = formData.get("addressLine2")?.toString().trim() || "";
  profileData.username = toHalfWidth(formData.get("username")?.toString().trim() || "");
  profileData.address = [profileData.prefecture, profileData.addressLine1, profileData.addressLine2].filter(Boolean).join("");
  profileSubmitted = true;
  isEditingProfile = false;
  profileFormStep = 1;
  upsertRegisteredWorker();
  updateIdentityUI();
  form.reset();
  setWorkerProfileGateStep(1);
  enterRoleApp();
});

document.querySelector("#companyApp .channel-list")?.addEventListener("click", (event) => {
  const btn = event.target.closest(".channel");
  if (!btn) return;
  const tab = btn.dataset.companyTab;
  if (!tab) return;

  document.querySelectorAll("#companyApp .channel").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll("#companyApp [data-company-section]").forEach((section) => {
    section.classList.toggle("is-hidden", section.dataset.companySection !== tab);
  });

  const headings = {
    dashboard: { title: "企業ダッシュボード", sub: "案件投稿から応募者選定までを管理" },
    post: { title: "案件投稿", sub: "新しい案件を作成・審査に送る" },
    applicants: { title: "応募者管理", sub: "応募者の確認・採用を行う" },
    payment: { title: "支払い・検収", sub: "完了報告の承認と報酬支払いを管理" },
  };
  const h = headings[tab];
  if (h) {
    const titleEl = document.querySelector("#companyApp .channel-heading strong");
    const subEl = document.querySelector("#companyApp .channel-heading span");
    if (titleEl) titleEl.textContent = h.title;
    if (subEl) subEl.textContent = h.sub;
  }
});

const APPLICANT_DATA = {
  misaki: { name: "佐藤 美咲", sub: "検品経験 12件・評価 4.9", avatar: "美", myNumber: true, approved: false },
  ryo:    { name: "田中 亮",   sub: "データ入力 8件・即日対応",  avatar: "田", myNumber: true, approved: true  },
  kana:   { name: "Kana S.",  sub: "本人確認済み・納期遵守率 100%", avatar: "K", myNumber: false, approved: false },
};

const applicantApprovalState = new Map(
  Object.entries(APPLICANT_DATA).map(([id, d]) => [id, d.approved])
);

function renderApplicantModal(id, context = "company") {
  const data = APPLICANT_DATA[id];
  if (!data) return;
  const approved = applicantApprovalState.get(id) ?? false;
  const approveLabel = context === "vuzz"
    ? (approved ? "承認取り消し" : "本人確認を承認")
    : (approved ? "承認取り消し" : "採用する");

  const titleEl = document.querySelector("#applicantModalTitle h2");
  if (titleEl) titleEl.textContent = data.name;

  const body = document.getElementById("applicantModalBody");
  if (body) {
    const idCardHtml = data.myNumber
      ? `<div class="id-card-placeholder">
           <div class="card-chip"></div>
           <div class="card-row"></div>
           <div class="card-row short"></div>
         </div>`
      : `<div class="id-card-empty">
           <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
           <span>マイナンバーカード 未提出</span>
         </div>`;

    body.innerHTML = `
      <div class="applicant-modal-profile">
        <div class="applicant-modal-avatar">${data.avatar}</div>
        <div>
          <strong>${data.name}</strong>
          <div style="color:var(--muted);font-size:13px;margin-top:4px">${data.sub}</div>
        </div>
      </div>
      <div class="id-card-section">
        <p class="eyebrow">マイナンバーカード</p>
        ${idCardHtml}
      </div>`;
  }

  const approveBtn = document.getElementById("applicantModalApproveBtn");
  if (approveBtn) {
    approveBtn.textContent = approveLabel;
    approveBtn.dataset.applicantId = id;
    approveBtn.dataset.context = context;
  }

  const modal = document.getElementById("applicantDetailModal");
  if (modal) {
    modal.showModal();
    refreshIcons();
  }
}

document.getElementById("applicantDetailModal")?.addEventListener("click", (event) => {
  const approveBtn = event.target.closest("#applicantModalApproveBtn");
  if (approveBtn) {
    const id = approveBtn.dataset.applicantId;
    if (!id) return;
    const ctx = approveBtn.dataset.context ?? "company";
    const current = applicantApprovalState.get(id) ?? false;
    applicantApprovalState.set(id, !current);
    const nextApproved = !current;
    approveBtn.textContent = nextApproved
      ? "承認取り消し"
      : (ctx === "vuzz" ? "本人確認を承認" : "採用する");
    return;
  }

  if (event.target.closest("#applicantModalClose") || event.target.closest("#applicantModalCancelBtn")) {
    document.getElementById("applicantDetailModal")?.close();
  }
});

document.getElementById("companyApp")?.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  const article = event.target.closest("article[data-applicant-id]");
  if (!article) return;
  renderApplicantModal(article.dataset.applicantId);
});

document.getElementById("vuzzApp")?.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  const article = event.target.closest("article[data-vuzz-worker-id]");
  if (!article || !article.dataset.vuzzWorkerId) return;
  renderApplicantModal(article.dataset.vuzzWorkerId, "vuzz");
});

document.getElementById("companyProfileGate")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  companyData.companyName = formData.get("companyName")?.toString().trim() || "";
  companyData.contactPhone = formData.get("contactPhone")?.toString().trim() || "";
  companyData.companyPostalCode = formData.get("companyPostalCode")?.toString().trim() || "";
  companyData.companyAddress = formData.get("companyAddress")?.toString().trim() || "";
  companyData.companyHistory = formData.get("companyHistory")?.toString().trim() || "";
  companyProfileSubmitted = true;
  form.reset();
  enterRoleApp();
});

const MOBILE_MQ = window.matchMedia("(max-width: 820px)");

function closeMobilePanel(shell) {
  shell.classList.remove("panel-open");
  shell.classList.add("panel-collapsed");
  const btn = shell.querySelector("[data-panel-toggle]");
  if (btn) btn.setAttribute("aria-label", "サイドバーを開く");
}

function closeAppPanel(shell) {
  if (!shell || !MOBILE_MQ.matches) return;
  closeMobilePanel(shell);
}

document.querySelectorAll(".app-shell").forEach((shell) => {
  const backdrop = document.createElement("div");
  backdrop.className = "panel-backdrop";
  shell.appendChild(backdrop);
  backdrop.addEventListener("click", () => closeMobilePanel(shell));

  let touchStartX = 0;
  let touchStartY = 0;

  shell.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  shell.addEventListener("touchend", (e) => {
    if (!MOBILE_MQ.matches) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dy) > Math.abs(dx)) return;
    const collapsed = shell.classList.contains("panel-collapsed");
    if (collapsed && dx > 50 && touchStartX < 48) {
      shell.classList.remove("panel-collapsed");
      const btn = shell.querySelector("[data-panel-toggle]");
      if (btn) btn.setAttribute("aria-label", "サイドバーを閉じる");
    } else if (!collapsed && dx < -50) {
      closeMobilePanel(shell);
    }
  }, { passive: true });
});

document.querySelectorAll("[data-panel-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const shell = button.closest(".app-shell");
    if (!shell) return;
    if (MOBILE_MQ.matches) {
      const collapsed = shell.classList.toggle("panel-collapsed");
      shell.classList.remove("panel-open");
      button.setAttribute("aria-label", collapsed ? "サイドバーを開く" : "サイドバーを閉じる");
    } else {
      const collapsed = shell.classList.toggle("panel-collapsed");
      button.setAttribute("aria-label", collapsed ? "サイドバーを開く" : "サイドバーを閉じる");
    }
  });
});

function completeLogout(button) {
  isLoggedIn = false;
  emailVerified = false;
  profileSubmitted = false;
  idSubmitted = false;
  contractIssued = false;
  lineRegistered = false;
  vuzzApplicationSubmitted = false;
  identityVerified = false;
  isEditingProfile = false;
  profileFormStep = 1;
  workerAuthEmail = "";
  companyProfileSubmitted = false;
  currentCompanyAccount = null;
  pendingLoginRole = null;
  pendingLoginMethod = null;
  updateIdentityUI();
  closeUtilityPopover();
  setLoginStep("role");
  if (button?.closest("#workerApp")) {
    showRole("worker");
    renderFeed();
  } else if (button?.closest("#vuzzApp")) {
    isVuzzLoggedIn = false;
    renderVuzzLogin("ログアウトしました。");
  } else {
    showLogin();
  }
}

logoutModal?.addEventListener("close", () => {
  const shouldLogout = logoutModal.returnValue === "confirm";
  const sourceButton = pendingLogoutButton;
  pendingLogoutButton = null;
  logoutModal.returnValue = "";
  if (shouldLogout) completeLogout(sourceButton);
});

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", () => {
    pendingLogoutButton = button;
    if (logoutModal?.showModal) {
      logoutModal.returnValue = "";
      logoutModal.showModal();
      refreshIcons();
      return;
    }
    if (window.confirm("ログアウトしますか？")) completeLogout(button);
  });
});

document.addEventListener("click", () => {
  closeUtilityPopover();
});

document.addEventListener("click", (event) => {
  const toggle = event.target.closest(".password-toggle");
  if (!toggle) return;

  const input = toggle.closest(".password-field")?.querySelector("input");
  if (!input) return;

  const shouldShow = input.type === "password";
  input.type = shouldShow ? "text" : "password";
  toggle.setAttribute("aria-label", shouldShow ? "パスワードを隠す" : "パスワードを表示");
  toggle.innerHTML = `<i data-lucide="${shouldShow ? "eye-off" : "eye"}"></i>`;
  refreshIcons();
});

renderDetail(jobs[0]);
renderFeed();
renderVuzzChannel("review");
bindGuestTopbarButtons();

const initialRole = window.location.hash.replace("#", "");
if (appViews[initialRole]) {
  showRole(initialRole);
} else {
  showRole("worker");
}

updateIdentityUI();
setupEmailValidation();
