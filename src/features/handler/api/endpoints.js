const handlerEndpoints = {
    font: "/api/handler/v1/font/",
    template: "/api/handler/v1/template/",
    templateDetail: (id) => `/api/handler/v1/template/${id}/`,
    templatePreview: (id) => `/api/handler/v1/template/${id}/preview/`,
    job: "/api/handler/v1/job/",
    jobDetail: (id) => `/api/handler/v1/job/${id}/`,
};

export default handlerEndpoints;
