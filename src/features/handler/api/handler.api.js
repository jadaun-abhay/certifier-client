import apiClient from "@/shared/services/apiClient";
import handlerEndpoints from "./endpoints";

export async function listFonts() {
    const response = await apiClient.get(handlerEndpoints.font);
    return response.data;
}

export async function uploadFont({ name, file }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    const response = await apiClient.post(handlerEndpoints.font, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function listTemplates() {
    const response = await apiClient.get(handlerEndpoints.template);
    return response.data;
}

export async function createTemplate({ name, file, fields }) {
    const response = await apiClient.post(handlerEndpoints.template, {
        name,
        file,
        fields,
    });
    return response.data;
}

export async function getTemplate(id) {
    const response = await apiClient.get(handlerEndpoints.templateDetail(id));
    return response.data;
}

export async function previewTemplate(id, row) {
    const response = await apiClient.post(
        handlerEndpoints.templatePreview(id),
        { row },
        { responseType: "blob" },
    );
    return URL.createObjectURL(response.data);
}

export async function listJobs() {
    const response = await apiClient.get(handlerEndpoints.job);
    return response.data;
}

export async function createJob({ template, data_file, purpose }) {
    const response = await apiClient.post(handlerEndpoints.job, {
        template,
        data_file,
        purpose,
    });
    return response.data;
}

export async function getJob(id) {
    const response = await apiClient.get(handlerEndpoints.jobDetail(id));
    return response.data;
}
