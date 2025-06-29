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
      return `
            <div class="card mb-3 m-2" value="${doc.id}" style="width: 17.8pc;font-size: 12px;height: 14pc;">
                <div class="row g-0" style="position: relative;">
                    <div class="img-box col-md-4 p-0 text-center d-flex flex-column">
                        <img src="${doc.avatarLink}" class="img-fluid rounded-end border avatar border-dark-subtle" alt="${doc.fullName}" style="margin-left: 14px;">
                        <a href="/combination/submited-detail/${doc.userId}" class="btn btn-primary mt-2" style="width: 86px;font-size: 12px;margin-left: 20px;">Xem thông tin</a>
                    </div>
                    <div class="col-md-8 ps-0">
                        <div class="card-body pb-3 pe-0">
                            <h6 class="card-title">${doc.fullName}</h6>
                            <div class="d-flex justify-content-between" style="font-size: 10px;">
                                <div class="d-flex align-items-start flex-column">
                                    <p class="pe-1 m-0" style="width: max-content;"><b>Giới tính:</b></p>
                                    <p class="m-0 pe-0" >${doc.gender}</p>
                                </div>
                                <div class="d-flex align-items-start flex-column mx-2">
                                    <p class="m-0" style="width: max-content;"><b>Ngày sinh:</b></p>
                                    <p class="m-0">${doc.dateOfBirth}</p>
                                </div>
                                <div class="align-items-start nation flex-column">
                                    <p class="m-0" style="width: max-content;"><b>Dân tộc:</b></p>
                                    <p class="m-0">${doc.nation}</p>
                                </div>
                            </div>

                            <div class="d-flex align-items-start flex-column">
                                <p class="pe-1 m-0"><b>Nguyện vọng 1:</b></p>
                                <p class="m-0 pe-0" >${doc.combination1}</p>
                            </div>

                            <div class="d-flex align-items-start flex-column">
                                <p class="pe-1 m-0"><b>Nguyện vọng 2:</b></p>
                                <p class="m-0 pe-0" >${doc.combination2}</p>
                            </div>
                            
                            <div class="d-flex align-items-start flex-column">
                                <p class="card-text mb-0"><small class="text-body-secondary">Đăng ký lúc:</small></p>
                                <p class="card-text"><small class="text-body-secondary"><b>${doc.registeredAt}</b></small></p>
                            </div>
                        </div>
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
