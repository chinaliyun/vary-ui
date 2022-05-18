<template>
  <var-scene w="800">
    <var-table :columns="columns" :data="data" center>
      <template #edit="">
        <var-scene flex center>
          <var-link primary>删除</var-link>
        </var-scene>
      </template>
    </var-table>
  </var-scene>
</template>
<script>
export default {
  name: "TableScroll",
  data() {
    return {
      columns: [
        {
          prop: "age",
          label: "年龄",
          width: 200,
        },
        {
          prop: "heavey",
          label: "体重",
          width: 200,
        },
        {
          prop: "height",
          label: "身高",
          width: 100,
        },
        {
          prop: "sex",
          label: "性别",
          width: 100,
        },
        {
          prop: "id",
          label: "ID",
          fixed: "left",
          width: 100,
        },
        {
          prop: "name",
          label: "姓名",
          fixed: "left",
          width: 200,
        },
        {
          prop: "edit",
          label: "编辑",
          fixed: "right",
          width: 100,
        },
      ],
      data: [
        {
          id: 1,
          name: "张三",
          age: 20,
          heavey: 180,
          height: 180,
          sex: "男",
          score: "100",
        },
        {
          id: 2,
          name: "李四",
          age: 22,
          heavey: 120,
          height: 170,
          sex: "女",
          score: "90",
        },
        {
          id: 3,
          name: "张三",
          age: 20,
          heavey: 180,
          height: 180,
          sex: "男",
          score: "100",
        },
        {
          id: 4,
          name: "李四",
          age: 22,
          heavey: 120,
          height: 170,
          sex: "女",
          score: "90",
        },
        {
          id: 5,
          name: "张三",
          age: 20,
          heavey: 180,
          height: 180,
          sex: "男",
          score: "100",
        },
        {
          id: 6,
          name: "李四",
          age: 22,
          heavey: 120,
          height: 170,
          sex: "女",
          score: "90",
        },
      ],
    };
  },
};
</script>