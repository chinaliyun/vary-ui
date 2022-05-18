<template>
  <var-table :columns="columns" :data="data" border center></var-table>
</template>
<script>
export default {
  name: "TableWidth",
  data() {
    return {
      columns: [
        {
          prop: "id",
          label: "ID",
          width: 100,
        },
        {
          prop: "name",
          label: "姓名",
          width: 100,
        },
        {
          prop: "age",
          label: "年龄",
        },
      ],
      data: [
        {
          id: 1,
          name: "张三",
          age: 20,
        },
        {
          id: 2,
          name: "李四",
          age: 22,
        },
        {
          id: 3,
          name: "王五",
          age: 21,
        },
      ],
    };
  },
};
</script>