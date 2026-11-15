/* Học liệu số Ngữ văn 9 – bản 1 (web tĩnh, không cần máy chủ) */
(function () {
  const D = window.HOC_LIEU, $ = s => document.querySelector(s);
  const LS = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const TABS = [["video", "Video"], ["taiLieu", "Tài liệu"], ["baiGiang", "Bài giảng"], ["phieu", "Phiếu học tập"]];
  const MAC_DINH = "9-Ngữ văn";
  const bo = s => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let mon = MAC_DINH, cur = -1, tab = 0, logo = null, anhQR = null;
  const xem = new Set(LS.get("daxem", []));
  const bai = () => D.baiHoc[mon] || [];
  const mauCD = cd => "var(--c" + ([...new Set(bai().map(b => b.chuyende))].indexOf(cd) % 8) + ")";
  const mobile = () => matchMedia("(max-width:900px)").matches;

  /* Chuyển link YouTube / Drive / Docs thành link nhúng. Canva và link khác: chỉ có nút mở. */
  function nhung(u) {
    let m;
    if ((m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/))) return ["vid", "https://www.youtube.com/embed/" + m[1]];
    if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return ["doc", "https://drive.google.com/file/d/" + m[1] + "/preview"];
    if ((m = u.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([\w-]+)/)))
      return ["doc", "https://docs.google.com/" + m[1] + "/d/" + m[2] + (m[1] === "presentation" ? "/embed" : "/preview")];
    return null;
  }
  const linkBai = i => location.href.split("#")[0] + "#bai-" + i;
  function bao(t) { const e = $("#toast"); e.textContent = t; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 1800); }

  function veMenu() {
    $("#side").innerHTML = D.khoi.map(k => `<details ${k.mo ? "open" : ""}><summary>${esc(k.ten)}</summary>` +
      D.monHoc.map(m => { const id = k.id + "-" + m; return `<button data-mon="${esc(id)}" class="${id === mon ? "on" : ""}">${esc(m)}${D.baiHoc[id] ? "" : "<em>Đang cập nhật</em>"}</button>`; }).join("") +
      "</details>").join("");
  }
  function veLoc() {
    const cds = [...new Set(bai().map(b => b.chuyende))];
    $("#cd").innerHTML = '<option value="">Tất cả chuyên đề</option>' + cds.map(c => `<option>${esc(c)}</option>`).join("");
  }
  function veDS() {
    const q = bo($("#q").value), cd = $("#cd").value, arr = bai();
    const ds = arr.map((b, i) => ({ b, i })).filter(({ b }) => (!cd || b.chuyende === cd) && (!q || bo(b.ten + " " + (b.mota || "") + " " + b.chuyende).includes(q)));
    $("#items").innerHTML = !arr.length ? '<li class="empty">Môn này đang cập nhật.</li>' :
      !ds.length ? '<li class="empty">Không tìm thấy bài phù hợp.</li>' :
      ds.map(({ b, i }) => `<li><button data-i="${i}" style="--c:${mauCD(b.chuyende)}" class="${i === cur ? "on" : ""}"><span class="tuan">Tuần ${esc(b.tuan)}</span><strong>${esc(b.ten)}</strong><small>${esc(b.chuyende)}</small>${xem.has(mon + i) ? '<i class="ok" title="Đã xem">✓</i>' : ""}</button></li>`).join("");
  }
  function veChiTiet() {
    const d = $("#detail"), b = bai()[cur];
    if (!b) { d.innerHTML = '<div class="hello"><h2>Chọn một bài học</h2><p>Mỗi bài có 4 loại học liệu. Hãy chọn bài trong danh sách.</p><div class="loai"><span style="--t:var(--t0)">Video</span><span style="--t:var(--t1)">Tài liệu</span><span style="--t:var(--t2)">Bài giảng</span><span style="--t:var(--t3)">Phiếu học tập</span></div></div>'; return; }
    const k = TABS[tab][0], u = (b[k] || "").trim(), e = u && nhung(u);
    d.innerHTML = `<div class="hd" style="--c:${mauCD(b.chuyende)}"><h2>${esc(b.ten)}</h2><p class="meta">Tuần ${esc(b.tuan)}, chuyên đề ${esc(b.chuyende)}</p></div>${b.mota ? `<p>${esc(b.mota)}</p>` : ""}` +
      `<div class="tabs" role="tablist">${TABS.map(([key, n], j) => `<button role="tab" style="--t:var(--t${j})" data-tab="${j}" aria-selected="${j === tab}" class="${j === tab ? "on" : ""}">${n}${b[key] ? '<i class="dot"></i>' : ""}</button>`).join("")}</div>` +
      `<div class="view">${!u ? '<p class="empty">Chưa có học liệu.</p>' : (e ? `<iframe class="${e[0]}" src="${e[1]}" title="${TABS[tab][1]}" allowfullscreen loading="lazy"></iframe>` : "")}` +
      `${u ? `<a class="btn b-xanh" href="${esc(u)}" target="_blank" rel="noopener">Mở trong tab mới</a>` : ""}</div>` +
      `<div class="acts"><button class="btn b-luc" id="bQR">Tạo mã QR</button><button class="btn b-cam" id="bCopy">Sao chép link</button></div>`;
  }
  function chon(i, cuon) {
    cur = i; tab = 0; xem.add(mon + i); LS.set("daxem", [...xem]);
    if (mon === MAC_DINH) history.replaceState(null, "", "#bai-" + i);
    veDS(); veChiTiet();
    if (cuon && mobile()) $("#detail").scrollIntoView({ behavior: "smooth" });
  }
  function doiMon(id) {
    mon = id; cur = -1; $("#q").value = ""; veMenu(); veLoc(); veDS(); veChiTiet();
    document.body.classList.remove("menu");
  }

  /* ---- Mã QR (dùng thư viện qrcodejs tải từ cdnjs, cần có mạng) ---- */
  function moQR(url) {
    logo = null; anhQR = null; $("#qrLogo").value = ""; $("#qrUrl").value = url || ""; $("#qrOut").innerHTML = ""; $("#qrDown").hidden = true;
    $("#qrDlg").showModal(); if (url) taoQR();
  }
  function taoQR() {
    const u = $("#qrUrl").value.trim(), out = $("#qrOut");
    if (!u) { out.innerHTML = '<p class="empty">Hãy nhập đường link để tạo mã.</p>'; return; }
    if (typeof QRCode === "undefined") { out.innerHTML = '<p class="empty">Chưa tải được thư viện tạo QR. Hãy kiểm tra kết nối mạng.</p>'; return; }
    const hop = document.createElement("div");
    new QRCode(hop, { text: u, width: 360, height: 360, correctLevel: QRCode.CorrectLevel.H });
    const nguon = hop.querySelector("canvas"), c = document.createElement("canvas");
    c.width = c.height = 360; const x = c.getContext("2d");
    x.fillStyle = "#fff"; x.fillRect(0, 0, 360, 360); x.drawImage(nguon, 0, 0);
    if (logo) { const s = 72, p = (360 - s) / 2; x.fillStyle = "#fff"; x.fillRect(p - 6, p - 6, s + 12, s + 12); x.drawImage(logo, p, p, s, s); }
    anhQR = c; out.replaceChildren(c); $("#qrDown").hidden = false;
  }

  /* ---- Sự kiện ---- */
  document.addEventListener("click", ev => {
    const t = ev.target.closest("button,a"); if (!t) return;
    if (t.dataset.mon) doiMon(t.dataset.mon);
    else if (t.dataset.i) chon(+t.dataset.i, true);
    else if (t.dataset.tab) { tab = +t.dataset.tab; veChiTiet(); }
    else if (t.id === "bCopy") { (navigator.clipboard ? navigator.clipboard.writeText(linkBai(cur)) : Promise.reject()).then(() => bao("Đã sao chép link"), () => bao("Không sao chép được, hãy chép từ thanh địa chỉ")); }
    else if (t.id === "bQR") moQR(linkBai(cur));
    else if (t.id === "qrMake") taoQR();
    else if (t.id === "qrClose") $("#qrDlg").close();
    else if (t.id === "qrDown" && anhQR) { const a = document.createElement("a"); a.href = anhQR.toDataURL("image/png"); a.download = "ma-qr.png"; a.click(); }
    else if (t.id === "btnMenu") document.body.classList.toggle("menu");
    else if (t.dataset.go) {
      ev.preventDefault(); const g = t.dataset.go;
      if (g === "home") { cur = -1; history.replaceState(null, "", location.pathname); veDS(); veChiTiet(); }
      else if (g === "hoc") { document.body.classList.add("menu"); $("#side").scrollIntoView({ behavior: "smooth" }); }
      else if (g === "on") { doiMon(MAC_DINH); $("#cd").value = ""; }
      else if (g === "tienich") moQR("");
    }
  });
  $("#qrLogo").addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) { logo = null; return; }
    const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => { logo = im; taoQR(); }; im.src = r.result; };
    r.readAsDataURL(f);
  });
  $("#q").addEventListener("input", veDS);
  $("#cd").addEventListener("change", veDS);

  /* Giao diện sáng / tối */
  const tinh = t => { document.documentElement.dataset.theme = t; LS.set("theme", t); };
  tinh(LS.get("theme", matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"));
  $("#btnTheme").addEventListener("click", () => tinh(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

  $("#foot").innerHTML = `${esc(D.truong)}. Tác giả: ${esc(D.tacGia)}. Liên hệ: ${esc(D.lienHe)}.`;
  veMenu(); veLoc(); veDS(); veChiTiet();
  const h = location.hash.match(/bai-(\d+)/); if (h && bai()[+h[1]]) chon(+h[1], false);
})();
