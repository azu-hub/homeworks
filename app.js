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
    badge: "今日締切",
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
let contractIssued = false;
let lineRegistered = false;
let vuzzApplicationSubmitted = false;
let identityVerified = false;
const savedJobs = new Set();
const applications = [];

const feed = document.querySelector("#jobFeed");
const channelTitle = document.querySelector("#channelTitle");
const feedTitle = document.querySelector("#feedTitle");
const feedIntroText = document.querySelector("#feedIntroText");
const searchInput = document.querySelector("#searchInput");
const categorySearchInput = document.querySelector("#categorySearchInput");
const allJobsCount = document.querySelector("#allJobsCount");
const saveCurrent = document.querySelector("#saveCurrent");
const savedCount = document.querySelector("#savedCount");
const postModal = document.querySelector("#postModal");
const workerMainGrid = document.querySelector("#workerApp .main-grid");
const filterRow = document.querySelector("#workerApp .filter-row");
const channelComposer = document.querySelector("#channelComposer");
const channelMessageInput = document.querySelector("#channelMessageInput");
const openMyPageButton = document.querySelector("#openMyPage");
const workerIdentityText = document.querySelector("#workerIdentityText");
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
    author: "vuzzサポート",
    avatar: "v",
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
    author: "vuzzサポート",
    avatar: "v",
    color: "#48b58c",
    time: "10:20",
    title: "送料は案件詳細の条件を確認してください",
    body: "資材配送ありの案件は、詳細欄に配送・返送条件を表示しています。不明な場合は企業へ質問できます。",
  },
];
const aiMessages = [
  {
    author: "vuzz AI",
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
      ["warn", "佐藤 美咲", "住所確認書類の文字が一部不鮮明", "再提出"],
      ["", "青葉ギフト", "法人番号と担当者情報の照合待ち", "承認"],
      ["danger", "worker-2048", "重複登録の可能性あり", "保留"],
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
};

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderVuzzChannel(channelKey) {
  const channel = vuzzChannels[channelKey];
  if (!channel) return;

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
            ([tone, title, description, action]) => `
              <article>
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

function getWorkerApprovalStatus() {
  if (!isLoggedIn) return "ゲスト閲覧中・応募には登録";
  if (!emailVerified) return "メール未認証・応募制限中";
  if (!profileSubmitted) return "基本情報未入力・応募制限中";
  if (!idSubmitted) return "身分証未提出・応募制限中";
  if (!contractIssued) return "契約書未交付・応募制限中";
  if (!vuzzApplicationSubmitted) return "vuzz申請前・応募制限中";
  if (!identityVerified) return "vuzz承認待ち・応募制限中";
  return "vuzz承認済み・応募可";
}

function getWorkerApprovalLabel() {
  if (!isLoggedIn) return "登録して応募";
  if (!emailVerified) return "メール認証後に応募";
  if (!identityVerified) return "vuzz承認後に応募";
  return "この案件に応募";
}

function updateIdentityUI() {
  workerIdentityText.textContent = getWorkerApprovalStatus();
  workerPresence.classList.toggle("warning", !isLoggedIn || !emailVerified || !identityVerified);
  document.querySelector("#applyButton").innerHTML = !isLoggedIn
    ? '<i data-lucide="user-plus"></i> 登録して応募'
    : !emailVerified
      ? '<i data-lucide="mail-check"></i> メール認証後に応募'
      : identityVerified
        ? '<i data-lucide="check-circle-2"></i> この案件に応募'
        : '<i data-lucide="badge-alert"></i> vuzz承認後に応募';
  refreshIcons();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
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
    return "応募するには、メール認証、基本情報、身分証提出、契約書受領、vuzz承認の順に進みます。公式LINE登録は任意です。";
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
    return "契約書受領まで完了するとvuzz運営へ申請されます。身分証提出は必須、公式LINE登録は任意です。";
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
          <article class="utility-item">
            <span class="utility-icon"><i data-lucide="briefcase-business"></i></span>
            <div>
              <strong>新しい案件が追加されました</strong>
              <p>検品・梱包に「封入作業 300セット」が届いています。</p>
            </div>
          </article>
          <article class="utility-item">
            <span class="utility-icon"><i data-lucide="shield-check"></i></span>
            <div>
              <strong>本人確認の進捗</strong>
              <p>${getWorkerApprovalStatus()}</p>
            </div>
          </article>
          <article class="utility-item">
            <span class="utility-icon"><i data-lucide="bookmark"></i></span>
            <div>
              <strong>保存済み案件</strong>
              <p>${savedJobs.size}件の案件を保存しています。</p>
            </div>
          </article>
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
              <span>vuzz運営からの連絡</span>
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

  refreshIcons();
}

function applyToJob(jobId) {
  const job = jobs.find((item) => item.id === jobId);
  if (!job) return;

  if (!isLoggedIn) {
    renderRegistrationForm("応募するには無料登録が必要です。");
    return;
  }

  if (!emailVerified) {
    renderEmailVerification("応募するにはメール認証が必要です。");
    return;
  }

  if (!identityVerified) {
    renderMyPage("応募するには、本人情報・身分証・契約書交付を完了し、vuzz運営の承認を受ける必要があります。");
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

function renderRegistrationForm(alertText = "") {
  if (isLoggedIn) {
    if (!emailVerified) {
      renderEmailVerification("登録済みです。メール認証を完了してください。");
      return;
    }
    renderMyPage(identityVerified ? "ログイン済みです。応募ステータスを確認できます。" : "ログイン済みです。応募には本人確認が必要です。");
    return;
  }

  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  channelTitle.textContent = "ワーカー登録";
  feedTitle.textContent = "ワーカー登録";
  feedIntroText.textContent =
    "案件は登録なしで閲覧できます。応募するにはアカウント登録後、本人確認を完了してください。";
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");

  feed.innerHTML = `
    ${alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="registration-grid">
      <form class="portal-panel registration-form" id="workerRegistrationForm">
        <div class="section-head">
          <div>
            <p class="eyebrow">worker signup</p>
            <h2>無料登録</h2>
          </div>
          <span class="status-badge">応募前に必要</span>
        </div>
        <div class="form-grid">
          <label>
            氏名
            <input type="text" value="佐藤 美咲" />
          </label>
          <label>
            メールアドレス
            <input type="email" value="misaki@example.com" />
          </label>
          <label>
            パスワード
            <span class="password-field">
              <input type="password" value="password" />
              <button class="icon-button password-toggle" type="button" aria-label="パスワードを表示">
                <i data-lucide="eye"></i>
              </button>
            </span>
          </label>
        </div>
        <button class="primary-button wide" type="submit">
          <i data-lucide="mail-check"></i>
          登録してメール認証へ
        </button>
        <button class="secondary-button wide" id="existingLoginButton" type="button">
          <i data-lucide="log-in"></i>
          すでに登録済み
        </button>
      </form>

      <aside class="portal-panel mypage-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">next step</p>
            <h2>登録後の流れ</h2>
          </div>
        </div>
        <dl class="ops-metrics">
          <div>
            <dt>1. 登録</dt>
            <dd>1分</dd>
          </div>
          <div>
            <dt>2. メール認証</dt>
            <dd>メール後</dd>
          </div>
          <div>
            <dt>3. 本人確認</dt>
            <dd>必須</dd>
          </div>
          <div>
            <dt>4. 応募</dt>
            <dd>可能</dd>
          </div>
        </dl>
      </aside>
    </section>
  `;

  document.querySelector("#workerRegistrationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    isLoggedIn = true;
    emailVerified = false;
    profileSubmitted = false;
    idSubmitted = false;
    contractIssued = false;
    lineRegistered = false;
    vuzzApplicationSubmitted = false;
    identityVerified = false;
    updateIdentityUI();
    renderEmailVerification("登録が完了しました。メールに届いた認証コードを確認してください。");
  });
  document.querySelector("#existingLoginButton").addEventListener("click", () => {
    isLoggedIn = true;
    emailVerified = true;
    profileSubmitted = false;
    idSubmitted = false;
    contractIssued = false;
    lineRegistered = false;
    vuzzApplicationSubmitted = false;
    identityVerified = false;
    updateIdentityUI();
    renderMyPage("ログインしました。応募には本人確認が必要です。");
  });
  refreshIcons();
}

function renderEmailVerification(alertText = "") {
  if (!isLoggedIn) {
    renderRegistrationForm("メール認証の前に登録が必要です。");
    return;
  }

  if (emailVerified) {
    renderMyPage("メール認証済みです。応募には本人確認を完了してください。");
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
        <p class="form-note">misaki@example.com に6桁の認証コードを送信しました。</p>
        <div class="form-grid">
          <label class="span-2">
            認証コード
            <input id="emailCodeInput" type="text" inputmode="numeric" value="123456" />
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

      <aside class="portal-panel mypage-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">security</p>
            <h2>認証状況</h2>
          </div>
        </div>
        <dl class="ops-metrics">
          <div>
            <dt>メール</dt>
            <dd>未認証</dd>
          </div>
          <div>
            <dt>本人確認</dt>
            <dd>未提出</dd>
          </div>
          <div>
            <dt>応募</dt>
            <dd>制限中</dd>
          </div>
        </dl>
      </aside>
    </section>
  `;

  document.querySelector("#emailVerificationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    emailVerified = true;
    identityVerified = false;
    updateIdentityUI();
    renderMyPage("メール認証が完了しました。続けて基本情報を入力してください。");
  });
  document.querySelector("#resendEmailButton").addEventListener("click", () => {
    renderEmailVerification("認証メールを再送しました。");
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

  document.querySelectorAll("#workerApp .channel").forEach((item) => item.classList.remove("active"));
  channelTitle.textContent = "マイページ";
  feedTitle.textContent = "マイページ";
  feedIntroText.textContent =
    "基本情報、身分証、契約書交付を完了するとvuzz運営へ申請され、承認後に案件へ応募できます。公式LINE登録は任意です。";
  workerMainGrid.classList.add("support-mode");
  filterRow?.classList.add("is-hidden");
  channelComposer.classList.add("is-hidden");

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
          <p>vuzz承認が完了すると、案件に応募できるようになります。</p>
        </div>
        <span class="status-badge">未応募</span>
      </article>
    `;

  const steps = [
    ["メール認証", emailVerified, emailVerified ? "完了" : "未完了"],
    ["基本情報入力", profileSubmitted, profileSubmitted ? "完了" : "未入力"],
    ["身分証提出", idSubmitted, idSubmitted ? "提出済み" : "未提出"],
    ["契約書交付", contractIssued, contractIssued ? "交付済み" : "未交付"],
    ["公式LINE登録", lineRegistered, lineRegistered ? "登録済み" : "任意"],
    ["vuzz申請", vuzzApplicationSubmitted, vuzzApplicationSubmitted ? "申請済み" : "未申請"],
    ["vuzz承認", identityVerified, identityVerified ? "承認済み" : "承認待ち"],
  ];

  const nextAction = !profileSubmitted
    ? `
      <form class="onboarding-action" id="profileForm">
        <div class="form-grid">
          <label>
            氏名
            <input type="text" value="佐藤 美咲" />
          </label>
          <label>
            生年月日
            <input type="date" value="1992-04-12" />
          </label>
          <label>
            郵便番号
            <input type="text" value="150-0001" />
          </label>
          <label>
            電話番号
            <input type="tel" value="090-1234-5678" />
          </label>
          <label class="span-2">
            住所
            <input type="text" value="東京都渋谷区神宮前1-1-1" />
          </label>
        </div>
        <button class="primary-button wide" type="submit">
          <i data-lucide="save"></i>
          基本情報を保存
        </button>
      </form>
    `
    : !idSubmitted
      ? `
        <div class="onboarding-action">
          <p class="form-note">運転免許証、マイナンバーカード、在留カードなどの本人確認書類を提出してください。</p>
          <button class="primary-button wide" id="submitIdButton" type="button">
            <i data-lucide="id-card"></i>
            身分証を提出
          </button>
        </div>
      `
      : !contractIssued
        ? `
          <div class="onboarding-action">
            <p class="form-note">業務委託に関する契約書を交付します。内容を確認して受領してください。受領後、自動でvuzz運営へ申請されます。</p>
            <button class="primary-button wide" id="issueContractButton" type="button">
              <i data-lucide="file-signature"></i>
              契約書を受領してvuzzへ申請
            </button>
          </div>
        `
        : !vuzzApplicationSubmitted
          ? `
            <div class="onboarding-action">
              <p class="form-note">契約書まで完了しました。申請が未送信の場合は、vuzz運営へ申請してください。</p>
              <button class="primary-button wide" id="submitVuzzApplicationButton" type="button">
                <i data-lucide="send"></i>
                vuzz運営へ申請
              </button>
              <button class="secondary-button wide" id="registerLineButton" type="button">
                <i data-lucide="message-circle"></i>
                公式LINEを任意で登録
              </button>
            </div>
          `
          : !identityVerified
            ? `
              <div class="onboarding-action">
                <p class="form-note">vuzz運営へ申請済みです。承認後に仕事を受けられます。公式LINE登録は任意ですが、連絡がスムーズになります。</p>
                <button class="secondary-button wide" id="registerLineButton" type="button">
                  <i data-lucide="message-circle"></i>
                  ${lineRegistered ? "公式LINE登録済み" : "公式LINEを任意で登録"}
                </button>
                <button class="primary-button wide" id="approveWorkerButton" type="button">
                  <i data-lucide="shield-check"></i>
                  vuzz承認する
                </button>
              </div>
            `
            : `
              <div class="onboarding-action">
                <p class="form-note">vuzz承認済みです。案件に応募できます。</p>
                <button class="primary-button wide" id="myPageApplyButton" type="button">
                  <i data-lucide="send"></i>
                  選択中の案件に応募
                </button>
              </div>
            `;

  feed.innerHTML = `
    ${alertText ? `<div class="mypage-alert">${alertText}</div>` : ""}
    <section class="mypage-grid">
      <article class="portal-panel mypage-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">onboarding</p>
            <h2>受注開始までの流れ</h2>
          </div>
          <span class="status-badge ${identityVerified ? "verified" : ""}">
            ${identityVerified ? "vuzz承認済み" : "承認前"}
          </span>
        </div>
        <div class="onboarding-steps">
          ${steps
            .map(
              ([label, done, status]) => `
                <div class="onboarding-step ${done ? "done" : ""}">
                  <span class="status-dot ${done ? "" : "warn"}"></span>
                  <strong>${label}</strong>
                  <span>${status}</span>
                </div>
              `,
            )
            .join("")}
        </div>
        ${nextAction}
      </article>

      <article class="portal-panel mypage-card">
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
    </section>
  `;

  document.querySelector("#profileForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    profileSubmitted = true;
    updateIdentityUI();
    renderMyPage("基本情報を保存しました。続けて身分証を提出してください。");
  });
  document.querySelector("#submitIdButton")?.addEventListener("click", () => {
    idSubmitted = true;
    updateIdentityUI();
    renderMyPage("身分証を提出しました。続けて契約書を確認してください。");
  });
  document.querySelector("#issueContractButton")?.addEventListener("click", () => {
    contractIssued = true;
    vuzzApplicationSubmitted = true;
    updateIdentityUI();
    renderMyPage("契約書を受領しました。vuzz運営へ申請しました。");
  });
  document.querySelector("#submitVuzzApplicationButton")?.addEventListener("click", () => {
    vuzzApplicationSubmitted = true;
    updateIdentityUI();
    renderMyPage("vuzz運営へ申請しました。承認をお待ちください。");
  });
  document.querySelector("#registerLineButton")?.addEventListener("click", () => {
    lineRegistered = true;
    updateIdentityUI();
    renderMyPage("公式LINE登録が完了しました。これは任意項目です。");
  });
  document.querySelector("#approveWorkerButton")?.addEventListener("click", () => {
    identityVerified = true;
    updateIdentityUI();
    renderMyPage("vuzz承認が完了しました。仕事を受けられます。");
  });
  document.querySelector("#myPageApplyButton")?.addEventListener("click", () => {
    if (!identityVerified) {
      renderMyPage("応募するにはvuzz承認が必要です。");
      return;
    }
    applyToJob(selectedJobId);
    renderMyPage("選択中の案件に応募しました。");
  });
  refreshIcons();
}

function showLogin() {
  loginView.classList.remove("is-hidden");
  Object.values(appViews).forEach((view) => view.classList.add("is-hidden"));
  window.location.hash = "";
  refreshIcons();
}

function showRole(role) {
  loginView.classList.add("is-hidden");
  Object.entries(appViews).forEach(([viewRole, view]) => {
    view.classList.toggle("is-hidden", viewRole !== role);
  });
  window.location.hash = role;
  refreshIcons();
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
  document.querySelectorAll("[data-channel-count]").forEach((countNode) => {
    const priceTier = countNode.dataset.priceTier;
    const category = countNode.dataset.category;
    countNode.textContent = jobs.filter((job) => matchesPriceAndCategory(job, priceTier, category)).length;
  });
}

function updateCategorySearchResults() {
  const query = categorySearchInput?.value.trim().toLowerCase() || "";

  document.querySelectorAll("[data-category-option]").forEach((button) => {
    const label = button.textContent.toLowerCase();
    button.classList.toggle("is-hidden", Boolean(query) && !label.includes(query));
  });

  document.querySelectorAll("[data-price-group]").forEach((group) => {
    const hasVisibleCategory = group.querySelector("[data-category-option]:not(.is-hidden)");
    group.classList.toggle("is-hidden", Boolean(query) && !hasVisibleCategory);
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
      "vuzz AIに案件選びや応募前の不安を相談できます。外部送信のないプロトタイプ用チャットです。";
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
        <div class="avatar" style="background:#48b58c">v</div>
        <div class="message-body">
          <div class="message-head"><strong>vuzzガイド</strong><time>固定</time><span class="badge">READ ONLY</span></div>
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
  feedTitle.textContent = activeChannel === "ai" ? "AI相談ルーム" : `#${channelLabel} へようこそ`;
  workerMainGrid.classList.toggle("support-mode", supportChannels.has(activeChannel));
  filterRow?.classList.toggle("is-hidden", supportChannels.has(activeChannel));
  channelComposer.classList.toggle("is-hidden", !writableChannels.has(activeChannel));
  aiRoomButton.classList.toggle("active", activeChannel === "ai");
  updateChannelCounts();
  updateCategorySearchResults();

  if (supportChannels.has(activeChannel)) {
    renderSupportChannel();
    return;
  }

  feedIntroText.textContent =
    "価格帯ごとに案件を並べ、各価格帯の中でカテゴリ別に確認できます。カテゴリ検索で見たい仕事だけに絞り込めます。";
  const visibleJobs = getVisibleJobs();

  if (!visibleJobs.length) {
    feed.innerHTML = `
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

  feed.innerHTML = visibleJobs
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
              <button class="mini-button ${savedJobs.has(job.id) ? "active" : ""}" data-action="save" data-id="${job.id}" type="button">
                ${savedJobs.has(job.id) ? "保存済み" : "保存"}
              </button>
              <button class="mini-button" data-action="apply" data-id="${job.id}" type="button">
                ${getWorkerApprovalLabel()}
              </button>
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
  updateIdentityUI();
}

function selectJob(id) {
  const job = jobs.find((item) => item.id === id);
  if (!job) return;
  renderDetail(job);
  renderFeed();
}

function toggleSave(id) {
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
    if (actionButton.dataset.action === "detail") selectJob(id);
    if (actionButton.dataset.action === "apply") {
      selectJob(id);
      applyToJob(id);
    }
    return;
  }

  if (message) selectJob(Number(message.dataset.id));
});

searchInput?.addEventListener("input", renderFeed);
categorySearchInput?.addEventListener("input", updateCategorySearchResults);

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
      author: "vuzz AI",
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
    if (button.dataset.loginRole === "worker") {
      isLoggedIn = true;
      emailVerified = true;
      profileSubmitted = false;
      idSubmitted = false;
      contractIssued = false;
      lineRegistered = false;
      vuzzApplicationSubmitted = false;
      identityVerified = false;
      updateIdentityUI();
    }
    showRole(button.dataset.loginRole);
  });
});

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", () => {
    isLoggedIn = false;
    emailVerified = false;
    profileSubmitted = false;
    idSubmitted = false;
    contractIssued = false;
    lineRegistered = false;
    vuzzApplicationSubmitted = false;
    identityVerified = false;
    updateIdentityUI();
    showRole("worker");
    renderFeed();
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

const initialRole = window.location.hash.replace("#", "");
if (appViews[initialRole]) {
  showRole(initialRole);
} else {
  showRole("worker");
}
