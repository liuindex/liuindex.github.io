import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <section className="text-center py-8 md:py-16">
          <div className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 rounded-full mb-4 md:mb-6">
            <span className="text-sm text-blue-600">免费·强大·安全</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">免费在线拼图工具，释放无限创意</h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
            免费在线拼图工具，纯前端客户端渲染，提供拼局拼图和长图拼接两大核心模式。支持在画布自由添加、编辑、移动和删除文字、箭头、方框等创意对象。所有操作均在本地完成，完全免费、无需登录、注重隐私。
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors md:min-w-[200px]">
              立即免费创作 →
            </button>
          </div>
        </section>

        <section className="flex items-center justify-center gap-4 md:gap-8 py-6">
          <div className="flex items-center gap-1">
            <span className="text-green-600">✓</span>
            <span className="text-sm md:text-base text-gray-600">完全免费</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600">✓</span>
            <span className="text-sm md:text-base text-gray-600">绝对隐私</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600">✓</span>
            <span className="text-sm md:text-base text-gray-600">无需登录</span>
          </div>
        </section>

        <section className="py-8 md:py-16">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-center">解决拼图烦恼，选择免费在线拼图工具</h2>
          <p className="text-sm md:text-base text-gray-600 text-center max-w-2xl mx-auto">
            我们懂你，这就是我们创造这个免费在线拼图工具的原因。
          </p>
        </section>
      </div>
    </div>
  );
}
