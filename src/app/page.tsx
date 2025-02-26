'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/_shadcn/ui/breadcrumb'
import { Button } from '@/_shadcn/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/_shadcn/ui/form'
import { ScrollArea } from '@/_shadcn/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shadcn/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_shadcn/ui/tabs'
import type { Building, Layout, Year } from '@/model/home'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const mainCities = ['千代田区', '中央区', '港区', '新宿区', '文京区', '渋谷区']
const cities = [
  '台東区',
  '墨田区',
  '江東区',
  '品川区',
  '目黒区',
  '大田区',
  '世田谷区',
  '中野区',
  '杉並区',
  '豊島区',
  '北区',
  '荒川区',
  '板橋区',
  '練馬区',
  '足立区',
  '葛飾区',
  '江戸川区',
]
const tokas = [
  '八王子市',
  '立川市',
  '武蔵野市',
  '三鷹市',
  '青梅市',
  '府中市',
  '昭島市',
  '調布市',
  '町田市',
  '小金井市',
  '小平市',
  '日野市',
  '東村山市',
  '国分寺市',
  '国立市',
  '福生市',
  '狛江市',
  '東大和市',
  '清瀬市',
  '東久留米市',
  '武蔵村山市',
  '多摩市',
  '稲城市',
  '羽村市',
  'あきる野市',
  '西東京市',
  '瑞穂町',
  '日の出町',
  '檜原村',
  '奥多摩町',
  '大島町',
  '利島村',
  '新島村',
  '神津島村',
  '三宅村',
  '御蔵島村',
  '八丈町',
  '青ヶ島村',
  '小笠原村',
]
const buildings: Building[] = ['マンション', 'アパート', '一戸建て・その他']
const layouts: Layout[] = [
  'ワンルーム',
  '1K',
  '1DK',
  '1LDK',
  '2K',
  '2DK',
  '2LDK',
  '3K',
  '3DK',
  '3LDK',
  '4K',
  '4DK',
  '4LDK',
  '5K以上',
]
const years: Year[] = [
  '新築',
  '1年以内',
  '3年以内',
  '5年以内',
  '7年以内',
  '10年以内',
  '15年以内',
  '20年以内',
  '25年以内',
  '30年以内',
  '指定しない',
]

const rents: string[] = [
  '0.0',
  '3.0',
  '3.5',
  '4.0',
  '4.5',
  '5.0',
  '5.5',
  '6.0',
  '6.5',
  '7.0',
  '7.5',
  '8.0',
  '8.5',
  '9.0',
  '9.5',
  '10.0',
  '10.5',
  '11.0',
  '11.5',
  '12.0',
  '12.5',
  '13.0',
  '13.5',
  '14.0',
  '14.5',
  '15.0',
  '15.5',
  '16.0',
  '16.5',
  '17.0',
  '17.5',
  '18.0',
  '18.5',
  '19.0',
  '19.5',
  '20.0',
  '21.0',
  '22.0',
  '23.0',
  '24.0',
  '25.0',
  '26.0',
  '27.0',
  '28.0',
  '29.0',
  '30.0',
  '35.0',
  '40.0',
  '50.0',
  '100.0',
]

const searchSchema = z.object({
  selectedCities: z
    .array(z.string())
    .min(1, '少なくとも1つのエリアを選択してください'),
  minRent: z.string(),
  maxRent: z.string(),
  layouts: z.array(z.string()),
  year: z.string(),
  buildings: z.array(z.string()),
})

export default function Home() {
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      selectedCities: [],
      minRent: '0.0',
      maxRent: '30.0',
      layouts: [],
      year: '指定しない',
      buildings: [],
    },
  })

  function onSubmit(values: {
    minRent: string
    maxRent: string
    year: string
    selectedCities: string[]
    layouts: string[]
    buildings: string[]
  }) {
    console.log('検索条件:', values)
  }

  return (
    <main>
      <Breadcrumb className="my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">物件検索</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="p-10 text-center text-6xl font-bold">
        グッとくるお部屋に出会おう
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}>
          <Tabs defaultValue="area" className="">
            <TabsList className="my-3">
              <TabsTrigger
                value="area"
                className="text-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                エリア
              </TabsTrigger>
              <TabsTrigger
                value="others"
                className="text-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                その他条件
              </TabsTrigger>
            </TabsList>
            <TabsContent value="area" className="h-[600px]">
              <FormField
                control={form.control}
                name="selectedCities"
                render={({ field }) => (
                  <>
                    <div>
                      <div>
                        <p className="text-xl font-bold bg-blue-300 px-3">
                          東京都-都心部
                        </p>
                        <div className="grid gap-2 grid-cols-4 mx-10 my-5">
                          {mainCities.map((mainCity, idx) => (
                            <FormItem key={idx}>
                              <div className="items-top flex space-x-2">
                                <FormControl>
                                  <input
                                    id={mainCity}
                                    type="checkbox"
                                    checked={field.value.includes(mainCity)}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked
                                          ? [...field.value, mainCity]
                                          : field.value.filter(
                                              (v) => v !== mainCity,
                                            ),
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormLabel htmlFor={mainCity}>
                                  {mainCity}
                                </FormLabel>
                              </div>
                            </FormItem>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xl font-bold bg-blue-300 px-3">
                          東京都-23区
                        </p>
                        <div className="grid gap-2 grid-cols-4 mx-10 my-5">
                          {cities.map((city, idx) => (
                            <FormItem key={idx}>
                              <div className="items-top flex space-x-2">
                                <FormControl>
                                  <input
                                    id={city}
                                    type="checkbox"
                                    checked={field.value.includes(city)}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked
                                          ? [...field.value, city]
                                          : field.value.filter(
                                              (v) => v !== city,
                                            ),
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormLabel htmlFor={city}>{city}</FormLabel>
                              </div>
                            </FormItem>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xl font-bold bg-blue-300 px-3">
                          東京都-都下
                        </p>
                        <div className="grid gap-2 grid-cols-4 mx-10 my-5">
                          {tokas.map((toka, idx) => (
                            <FormItem key={idx}>
                              <div
                                key={idx}
                                className="items-top flex space-x-2"
                              >
                                <FormControl>
                                  <input
                                    id={toka}
                                    type="checkbox"
                                    checked={field.value.includes(toka)}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked
                                          ? [...field.value, toka]
                                          : field.value.filter(
                                              (v) => v !== toka,
                                            ),
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormLabel htmlFor={toka}>{toka}</FormLabel>
                              </div>
                            </FormItem>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              />
            </TabsContent>
            <TabsContent value="others" className="h-[600px]">
              <div>
                <div>
                  <p className="text-xl font-bold bg-blue-300 px-3">賃料</p>
                  <div className="flex  mx-10 my-5">
                    <FormField
                      control={form.control}
                      name="minRent"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="下限なし" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg rounded-md">
                            <ScrollArea className="h-60">
                              {rents.map((rent, idx) => (
                                <SelectItem
                                  key={idx}
                                  value={rent}
                                  className="hover:bg-blue-100 transition-colors duration-200 ease-in-out"
                                >
                                  {rent + '万以上'}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    <div className="flex items-center justify-center">
                      <span className="mx-3 align-middle">〜</span>
                    </div>

                    <FormField
                      control={form.control}
                      name="maxRent"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="上限なし" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg rounded-md">
                            <ScrollArea className="h-60">
                              {rents.map((rent, idx) => (
                                <SelectItem
                                  key={idx}
                                  value={rent}
                                  className="hover:bg-blue-100 transition-colors duration-200 ease-in-out"
                                >
                                  {rent + '万以下'}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold bg-blue-300 px-3">築年数</p>
                  <div className="grid gap-2 grid-cols-4 mx-10 my-5">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <>
                          {years.map((year, idx) => (
                            <FormItem key={idx}>
                              <div className="items-top flex space-x-2">
                                <FormControl>
                                  <input
                                    id={year}
                                    name="year"
                                    type="radio"
                                    checked={field.value === year}
                                    onChange={() => field.onChange(year)}
                                  />
                                </FormControl>
                                <FormLabel htmlFor={year}>{year}</FormLabel>
                              </div>
                            </FormItem>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl font-bold bg-blue-300 px-3">間取り</p>
                  <div className="grid gap-2 grid-cols-4 mx-10 my-5">
                    <FormField
                      control={form.control}
                      name="layouts"
                      render={({ field }) => (
                        <>
                          {layouts.map((layout, idx) => (
                            <FormItem key={idx}>
                              <div
                                key={idx}
                                className="items-top flex space-x-2"
                              >
                                <FormControl>
                                  <input
                                    id={layout}
                                    type="checkbox"
                                    checked={field.value.includes(layout)}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked
                                          ? [...field.value, layout]
                                          : field.value.filter(
                                              (v) => v !== layout,
                                            ),
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormLabel htmlFor={layout}>{layout}</FormLabel>
                              </div>
                            </FormItem>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl font-bold bg-blue-300 px-3">建物種別</p>
                  <div className="grid gap-2 grid-cols-4 mx-10 my-5">
                    <FormField
                      control={form.control}
                      name="buildings"
                      render={({ field }) => (
                        <>
                          {buildings.map((building, idx) => (
                            <FormItem key={idx}>
                              <div
                                key={idx}
                                className="items-top flex space-x-2"
                              >
                                <FormControl>
                                  <input
                                    id={building}
                                    type="checkbox"
                                    checked={field.value.includes(building)}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked
                                          ? [...field.value, building]
                                          : field.value.filter(
                                              (v) => v !== building,
                                            ),
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormLabel htmlFor={building}>
                                  {building}
                                </FormLabel>
                              </div>
                            </FormItem>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center my-10">
            <Button
              className="border rounded-lg border-black bg-blue-500 hover:bg-blue-600 text-white"
              variant={'outline'}
              type="submit"
            >
              {/* <Link href={'/homes'}> */}
              検索
              {/* </Link> */}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
