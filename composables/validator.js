export const initUserValidator = () => {
  const formRef = ref(null);

  const form = reactive({
    imgData: null,
    name: "",
    email: "",
    validationCode: "",
    password: "",
    rePassword: "",
  });

  const validatePass = (rule, value, callback) => {
    if (value === "") {
      return callback(new Error("请输入密码"));
    } else if (value.length > 30 || value.length < 6) {
      return callback(new Error("密码长度应在6-30之间"));
    } else if (form.rePassword !== "") {
      if (!formRef.value) return;
      formRef.value.validateField("rePassword");
    }
    callback();
  };

  const validateRepassword = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== form.password) {
      callback(new Error("两次输入密码不一致"));
    } else if (value.length > 30 || value.length < 6) {
      callback(new Error("密码长度应在6-30之间"));
    } else {
      callback();
    }
  };

  const rules = reactive({
    imgData: [
      {
        required: true,
        message: "请上传图片,内容大小不得超过2MB",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "请输入昵称,宽度应在2-15之间",
        trigger: "blur",
        min: 2,
        max: 15,
      },
    ],
    email: [
      {
        required: true,
        message: "请输入邮箱地址",
        trigger: "blur",
        type: "email",
      },
    ],
    password: [
      {
        required: true,
        validator: validatePass,
        trigger: "change",
      },
    ],
    rePassword: [
      {
        required: true,
        validator: validateRepassword,
        trigger: "blur",
      },
    ],
    validationCode: [
      { required: true, message: "请输入验证码", trigger: "blur" },
    ],
  });

  return {
    formRef,
    form,
    rules,
  };
};

export const urlValidator = (rule, value, callback) => {
  const urlPattern = /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+(?:[\/\w\.-]*)*\/?$/;
  if (!urlPattern.test(value)) {
    callback(new Error("请输入有效的 URL"));
  } else {
    callback();
  }
};
