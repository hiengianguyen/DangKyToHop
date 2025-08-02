function renderCardSubmitted(parentElement, data) {
  if (data.length > 10) {
    parentElement.style.height = "45pc";
    parentElement.style.overflowY = "scroll";
  } else {
    parentElement.style.height = "auto";
    parentElement.style.overflowY = "auto";
  }
  parentElement.innerHTML = "";
  parentElement.innerHTML = data
    .map((doc) => {
      let colorBadge, textBadge;
      switch (doc.status) {
        case "approved":
          colorBadge = "#198754";
          textBadge = "Đã phê duyệt";
          break;
        case "rejected":
          colorBadge = "#dc3545";
          textBadge = "Không phê duyệt";
          break;
        default:
          colorBadge = "#6c757d";
          textBadge = "Đã nộp";
          break;
      }
      return `
            <div class="card mb-3 m-2 position-relative" value="${doc.id}" style="width: 22pc;font-size: 12px;">
                <div class="row g-0" style="position: relative;">
                    <div class="img-box col-md-4 p-0 text-center d-flex flex-column">
                        <img src="${doc.avatarLink}" class="img-fluid avatar rounded-end border border-dark-subtle" alt="${doc.fullName}" style="margin-left: 14px; max-width:90%;">
                    </div>
                    <div class="col-md-8 ps-0 position-relative">
                        <div class="card-body pb-3 pe-2">
                            <div class="name-status mb-2">
                                <p class="m-0">Họ và tên:</p>
                                <h6 class="card-title m-0" title="${doc.fullName}">${doc.fullName}</h6>
                            </div>

                            <div class="details">
                                <span class="d-flex align-items-center main">
                                    <p class="mb-0 me-2" title="Giới tính: ${doc.gender}">${doc.gender}</p> • 
                                    <p class="mb-0 mx-2" title="Ngày sinh: ${doc.dateOfBirth}">${doc.dateOfBirth}</p> • 
                                    <p class="mb-0 ms-2" title="Dân tộc: ${doc.nation}">${doc.nation}</p>
                                </span>
                                <span title="Nguyện vọng 1: ${doc.combination1}">NV1: ${doc.combination1}</span>
                                <span title="Nguyện vọng 2: ${doc.combination2}">NV2: ${doc.combination2}</span>
                                <span class="time" title="Đăng ký lúc: ${doc.registeredAt}">${doc.registeredAt}</span>
                            </div>
                            <a href="/combination/submited-detail/${doc.userId}" class="btn btn-primary mt-2" style="width: max-content;font-size: 12px;">Xem thông tin</a>
                        </div>
                        <span class="badge badge-${doc.status} position-absolute" title="Trạng thái" style="top: 8px; right:25px;">${textBadge}</span>
                    </div>
                </div>
                <div class="position-absolute" style="bottom: 10px;right: 15px;">
                    <i title="Lưu hồ sơ này" value="${doc.id}" class="fa-solid fa-bookmark save-doc-icon ${doc.favourite ? "saved" : ""}"></i>
                </div>
            </div>
        `;
    })
    .join("");

  document.getElementById("all-content").style.height = document.getElementById("master").clientHeight;
}
