import { defineComponent } from "vue";
import alipayImg from "@/assets/images/alipay.png";

const MobilePaySelect = defineComponent(() => {
  return () => (
    <div class="py-2 h-[80vh] flex flex-col">
      <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">选择支付方式</h2>
      {/* <!-- 支付宝 --> */}
      <div
        class="flex items-center px-2 py-2 border-b border-b-zinc-200 dark:border-b-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-900"
        onClick="onAlipay"
      >
        <img class="w-4 h-4" src={alipayImg} alt="" />
        <p class="text-xl ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
      </div>
    </div>
  );
});

MobilePaySelect.props = {
  payData: {}
};

export default MobilePaySelect;
