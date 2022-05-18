<template>
  <var-table
    :columns="columns"
    :data="data"
    center
    :headStyle="{ backgroundColor: 'antiquewhite', color: 'white' }"
  >
    <template #info_th=""> 详细信息 </template>
    <template #info="{ row }">
      <var-scene flex center>年龄:{{ row.age }} 性别:{{ row.sex }} </var-scene>
    </template>
  </var-table>
</template>
<script>
export default {
  name: "TableSlot",
  data() {
    return {
      columns: [
        {
          prop: "id",
          label: "ID",
        },
        {
          prop: "name",
          label: "姓名",
          headStyle: {
            backgroundColor: "rgb(215, 225, 250)",
          },
          rowStyle: {
            backgroundColor: "rgb(238, 252, 239)",
            color: "black",
          },
        },
        {
          prop: "info",
          label: "信息",
        },
      ],
      data: [
        {
          id: 1,
          name: "张三",
          age: 20,
          sex: "男",
        },
        {
          id: 2,
          name: "李四",
          age: 22,
          sex: "女",
        },
        {
          id: 3,
          name: "王五",
          age: 21,
          sex: "男",
        },
      ],
    };
  },
};
</script>