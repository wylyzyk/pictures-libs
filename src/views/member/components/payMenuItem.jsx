import { defineComponent } from "vue";

const EMITS_CLICK = "click";

const PayMenuItem = defineComponent((props, { emit }) => {
  const onItemClick = () => {
    emit(EMITS_CLICK, props.data);
  };

  return () => (
    // <!-- 单个的支付项 -->
    <div
      // class="flex-none flex flex-col items-center w-[100px] mt-2 mr-2 py-3 border-[1px] hover:bg-orange-50 hover:border-orange-300 rounded-md relative cursor-pointer xl:w-[150px] xl:py-2"
      class={[
        props.select
          ? "bg-orange-50 dark:bg-orange-50/10 border-orange-300 "
          : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-500",
        "flex-none flex flex-col items-center w-[100px] mt-2 mr-2 py-3 border-[1px] hover:bg-orange-50 hover:border-orange-300 rounded-md relative cursor-pointer xl:w-[150px] xl:py-2"
      ]}
      onClick={onItemClick}
    >
      {/* <!-- 标题 --> */}
      <p
        // class="text-base"
        class={[
          props.select ? "text-yellow-800 dark:text-orange-300" : "text-yellow-800 dark:text-zinc-300",
          "text-base"
        ]}
      >
        {props.data.title}
      </p>
      {/* <!-- 价格 --> */}
      <p
        // class="text-[32px] tracking-tighter font-sans font-bold"
        class={[
          props.select ? "text-yellow-800 dark:text-orange-300" : "text-yellow-800 dark:text-zinc-300",
          "text-[32px] tracking-tighter font-sans font-bold"
        ]}
      >
        <span class="text-base">￥</span>
        {props.data.price}
      </p>
      {/* <!-- 原价 --> */}
      <p class="text-xs text-yellow-500 line-through">￥{props.data.oldPrice}</p>
      {/* <!-- 热销 --> */}
      {props.hot && (
        <div className="absolute right-[-1px] top-[-12px] h-[22px] w-[48px] leading-[22px] text-center text-yellow-700 bg-gradient-to-r from-orange-300 to-orange-100 text-[12px] rounded-tr-[10px] rounded-bl-[10px]">
          热销
        </div>
      )}
    </div>
  );
});

PayMenuItem.props = {
  data: {},
  hot: false,
  select: false
};

export default PayMenuItem;
