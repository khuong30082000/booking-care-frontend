import axios from "./axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get("/api/get-all-users", {
    params: {
      ...inputId,
    },
  });
};

const deleteUser = (user) => {
  return axios.delete("/api/delete-user", {
    data: { id: user.id },
  });
};

const editUser = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCode = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-new-user", data);
};

const getTopDoctorHome = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailInfoDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDoctorById = (doctorId) => {
  return axios.get(`api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBook = (data) => {
  return axios.post("api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("api/verify-book-appointment", data);
};

const createNewSpecialty = (data) => {
  return axios.post("api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get("api/get-all-specialty");
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post("api/create-new-clinic", data);
};

const getAllClinic = () => {
  return axios.get("api/get-all-clinic");
};

const getAllDetailClinicById = (data) => {
  return axios.get(`api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

export {
  handleLogin,
  getAllUsers,
  deleteUser,
  getAllCode,
  createNewUser,
  editUser,
  getTopDoctorHome,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postPatientBook,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
};
