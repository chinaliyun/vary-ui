import Alert from "./lib/Alert";
import Avatar from "./lib/Avatar";
import Button from "./lib/Button";
import Card from "./lib/Card";
import Checkbox from "./lib/Checkbox";
import DatetimePicker from "./lib/DatetimePicker";
import Dialog from "./lib/Dialog";
import Field from "./lib/Field";
import Input from "./lib/Input";
import Link from "./lib/Link";
import Message from "./lib/Message";
import Notify from "./lib/Notify";
import Pager from "./lib/Pager";
import Preview from "./lib/Preview";
import Radio from "./lib/Radio";
import Scene from "./lib/Scene";
import Select from "./lib/Select";
import SmsCode from "./lib/SmsCode";
import Space from "./lib/Space";
import Steps from "./lib/Steps";
import Switch from "./lib/Switch";
import Table from "./lib/Table";
import Tabs from "./lib/Tabs";
import Textarea from "./lib/Textarea";
import Upload from "./lib/Upload";
import Loading from "./lib/Loading";

let components = [
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  DatetimePicker,
  Dialog,
  Field,
  Input,
  Link,
  Message,
  Notify,
  Pager,
  Preview,
  Radio,
  Scene,
  Select,
  SmsCode,
  Space,
  Steps,
  Switch,
  Table,
  Tabs,
  Textarea,
  Upload,
  Loading,
];

const Instance = {
  install: function (Vue, options = {}) {
    components.forEach((component) => {
      Vue.use(component, options);
    });
  },
};

export default Instance;
export {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  DatetimePicker,
  Dialog,
  Field,
  Input,
  Link,
  Message,
  Notify,
  Pager,
  Preview,
  Radio,
  Scene,
  Select,
  SmsCode,
  Space,
  Steps,
  Table,
  Tabs,
  Textarea,
  Upload,
  Loading,
};
