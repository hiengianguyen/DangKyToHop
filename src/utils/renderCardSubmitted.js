function renderCardSubmitted(parentElement, data) {
  parentElement.innerHTML = "";
  parentElement.innerHTML = data
    .map((doc) => {
      return `
            <div class="card mb-3 m-2" style="width: 17.8pc;font-size: 12px;height: 14pc;">
                <div class="row g-0" style="position: relative;">
                    <div class="col-md-4 p-0 text-center d-flex align-items-center flex-column">
                        <img src="${doc.avatarLink}" class="img-fluid rounded-end border border-dark-subtle" alt="${doc.fullName}" style="margin-left: 5px;">
                        <a href="submited-detail/${doc.userId}" class="btn btn-primary mt-2" style="width: 86px;font-size: 12px;margin-left: 7px;">Xem thông tin</a>
                    </div>
                    <div class="col-md-8 ps-0">
                        <div class="card-body pe-0">
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
                                <div class="d-flex align-items-start flex-column">
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
            </div>
        `;
    })
    .join("");
}
