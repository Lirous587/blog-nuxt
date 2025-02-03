// 列表 分页 搜索 删除 修改状态
export function useInitTable(opt = {}) {
  let searchForm = null;
  let resetSearchForm = null;
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm });
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key];
      }
      getData();
    };
  }

  const tableData = ref([]);

  const loading = ref(false);

  //分页
  const currentPage = ref(1);
  const pages = ref(1);

  // 获取数据
  async function getData(page = null) {
    if (typeof page == "number") {
      currentPage.value = page;
      searchForm.page = page;
    }
    loading.value = true;
    await opt
      .getList(searchForm)
      .then((res) => {
        const data = res.data;
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
          opt.onGetListSuccess(data);
        } else {
          tableData.value = data.list;
          pages.value = data.pages;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
  onMounted(() => {
    getData();
  });

  // 删除
  const handleDelete = (id) => {
    loading.value = true;
    opt
      .delete(id)
      .then(() => {
        toast("删除成功");
        getData();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  //修改状态
  const handleStatusChange = async (status, row) => {
    row.statusLoading = true;
    await opt
      .updateStatus(row.id, status)
      .then(() => {
        toast("修改状态成功");
        row.status = status;
      })
      .finally(() => {
        row.statusLoading = false;
      });
    return status;
  };

  // 表格多选
  const multipleTableRef = ref(null);
  const multipleSelectionIds = ref([]);
  const handleSelectionChange = (e) => {
    multipleSelectionIds.value = e.map((o) => o.id);
  };
  const handleMultipleDelete = () => {
    if (multipleSelectionIds.value.length > 0) {
      loading.value = true;
      opt
        .delete(multipleSelectionIds.value)
        .then(() => {
          toast("批量删除成功");
          getData();
        })
        .finally(() => {
          loading.value = false;
          // 清空选中
          if (multipleTableRef.value) {
            multipleTableRef.value.clearSelection();
          }
        });
    } else {
      toast("请先选择", "warning");
    }
  };

  // 批量修改状态
  const handleMultipleStatusChange = (status) => {
    if (multipleSelectionIds.value.length > 0) {
      loading.value = true;
      opt
        .updateStatus(multipleSelectionIds.value, status)
        .then((res) => {
          toast("批量修改状态成功");
          getData();
        })
        .finally(() => {
          loading.value = false;
          // 清空选中
          if (multipleTableRef.value) {
            multipleTableRef.value.clearSelection();
          }
        });
    } else {
      toast("请先选择", "warning");
    }
  };

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    pages,
    getData,
    handleDelete,
    handleStatusChange,
    multipleTableRef,
    handleSelectionChange,
    handleMultipleDelete,
    handleMultipleStatusChange,
    multipleSelectionIds,
  };
}

// 新增 修改
export const useInitForm = (opt) => {
  // 表单部分
  const drawerRef = ref(null);
  const formRef = ref(null);
  // 表单默认值
  const defaultForm = opt.form;
  const form = reactive({});

  // 表单验证
  const rules = opt.rules || {};

  const editId = ref(0);
  const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

  // 提交表单
  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return;

      drawerRef.value.showLoading();

      let body = {};

      if (opt.berforSumbit && typeof opt.berforSubmit === "function") {
        body = opt.berforSubmit({ ...form });
      } else {
        body = form;
      }

      const fun = editId.value
        ? opt.update(editId.value, body)
        : opt.create(body);

      fun
        .then(() => {
          toast(drawerTitle.value + "成功");
          opt.getData();
          drawerRef.value.close();
        })
        .finally(() => {
          drawerRef.value.hideLoading();
        });
    });
  };

  // 重置表单
  function resetForm(row) {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
    for (const key in defaultForm) {
      form[key] = row[key];
    }
  }

  // 新增
  const handleCreate = () => {
    editId.value = 0;
    resetForm(defaultForm);
    drawerRef.value.open();
    if (opt.onCreate && typeof opt.onCreate === "function") {
      opt.onCreate();
    }
  };

  // 编辑
  const handleEdit = (row) => {
    editId.value = row.id;
    resetForm(row);
    drawerRef.value.open();
    if (opt.onBerfoerEdit && typeof opt.onBerfoerEdit === "function") {
      opt.onBerfoerEdit();
    }
  };

  return {
    drawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit,
  };
};
