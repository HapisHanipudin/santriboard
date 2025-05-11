<template>
  <div>

    <div class="flex justify-center my-8">
        <div class="text-center mx-4">
            <div class="text-2xl mb-2"><i class="fas fa-crown text-gray-400"></i></div>
            <img class="rounded-full w-24 h-24 mx-auto" src="https://storage.googleapis.com/a1aa/image/lLahCa8esDSBO2H8qkFdTDXgwyqVPjqwIC9nahOcB9s.jpg" alt="Profile picture of the second place holder">
            <div class="text-lg mt-2">Nama Santri</div>
            <div class="text-2xl text-yellow-400">8452</div>
        </div>
        <div class="text-center mx-4 flex flex-col items-center">
            <div class="text-2xl mb-2"><i class="fas fa-crown text-yellow-400"></i></div>
            <img class="rounded-full w-28 h-28" src="https://storage.googleapis.com/a1aa/image/WxBhGpG3L8OIMj-_qLtIcJIJYRSxSvbqj-dxFGmxqGQ.jpg" alt="Profile picture of the first place holder">
            <div class="text-lg mt-2">Nama Santri</div>
            <div class="text-2xl text-yellow-400">9412</div>
        </div>
        <div class="text-center mx-4">
            <div class="text-2xl mb-2"><i class="fas fa-crown text-amber-700"></i></div>
            <img class="rounded-full w-24 h-24 mx-auto" src="https://storage.googleapis.com/a1aa/image/HdxeXrdJHwPk4OmvGyfp0kb7EofFeQT1i2QSTrORr-8.jpg" alt="Profile picture of the third place holder">
            <div class="text-lg mt-2">Nama Santri</div>
            <div class="text-2xl text-yellow-400">8239</div>
        </div>
    </div>
    <div class="w-full overflow-x-auto px-4 rounded-[15px] overflow-hidden">
        <table class="w-full table-auto rounded-[15px] overflow-hidden">
            <thead>
                <tr class="bg-gray-800">
                    <th class="px-4 py-2 text-center">Ranking</th>
                    <th class="px-4 py-2 text-center">Nama Santri</th>
                    <th class="px-4 py-2 text-center">Kelas</th>
                    <th class="px-4 py-2 text-center">Tahfidz</th>
                    <th class="px-4 py-2 text-center">IT</th>
                    <th class="px-4 py-2 text-center">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-gray-700">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i><span class="bg-black font-bold text-yellow-400 px-2 py-1 rounded-full">1</span></td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/zWku6vPRBxNksw5MobRrWxyMsAx0E3a7jtSLbUTzl_g.jpg" alt="Profile picture of the fourth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">9412</button></td>
                </tr>
                <tr class="bg-gray-800">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-down text-red-500 mr-2"></i><span class="bg-black font-bold text-gray-400 px-2 py-1 rounded-full">2</span></td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/XTa432WZNGUQ5MMWpGGP9HFuepDIv7PApYvDsFMdeJ0.jpg" alt="Profile picture of the fifth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">8452</button></td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i><span class="bg-black font-bold text-amber-700 px-2 py-1 rounded-full">3</span></td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/LYgrvEaHA7zVP2BkgUmNegAE_VQMRbJItu6C2mHXyuA.jpg" alt="Profile picture of the sixth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">8239</button></td>
                </tr>
                <tr class="bg-gray-800">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-down text-red-500 mr-2"></i>4</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/cKWoeIhfSohDXILqflNU7d25sQagUj_wJiOhuk8Vd9c.jpg" alt="Profile picture of the seventh place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">7564</button></td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i>5</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/p0Fx7hyF4XF0XOHMhgPyKvKpTvaiXQI3oDdIkr8MEQM.jpg" alt="Profile picture of the eighth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">6576</button></td>
                </tr>
                <tr class="bg-gray-800">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-down text-red-500 mr-2"></i>6</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/HS6Tr9ys1DFZZNt4Mn7px_Lzeq6vS2j58ELD5gxa04g.jpg" alt="Profile picture of the ninth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">6499</button></td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i>7</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/CqUNvW-yUJVn3rq_okHyTYYvoZoqZDsKl9VxIalm1Fc.jpg" alt="Profile picture of the tenth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">5524</button></td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i>8</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/p0Fx7hyF4XF0XOHMhgPyKvKpTvaiXQI3oDdIkr8MEQM.jpg" alt="Profile picture of the eighth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">4872</button></td>
                </tr>
                <tr class="bg-gray-800">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-down text-red-500 mr-2"></i>9</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/HS6Tr9ys1DFZZNt4Mn7px_Lzeq6vS2j58ELD5gxa04g.jpg" alt="Profile picture of the ninth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">3128</button></td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i>10</td>
                    <td class="px-4 py-2 text-center"><div class="flex items-center justify-center"><img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/CqUNvW-yUJVn3rq_okHyTYYvoZoqZDsKl9VxIalm1Fc.jpg" alt="Profile picture of the tenth place holder">Nama Santri</div></td>
                    <td class="px-4 py-2 text-center">3 QBS</td>
                    <td class="px-4 py-2 text-center">Ust Husain</td>
                    <td class="px-4 py-2 text-center">Programming</td>
                    <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">3012</button></td>
                </tr>
            </tbody>
        </table>
    </div>


  </div>
</template>

<script lang="ts" setup></script>

<style></style>
