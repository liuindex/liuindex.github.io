import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">头像编辑器</h1>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            一个简单易用的在线头像编辑工具，让你的头像更加个性化
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>头像编辑</CardTitle>
              <CardDescription>为你的头像添加国旗边框</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                上传你的头像，选择喜欢的国旗边框，一键生成个性化头像
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/avatar-editor" className="w-full">
                <Button className="w-full">开始使用</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>响应式设计</CardTitle>
              <CardDescription>适配各种设备</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                无论是在电脑还是手机上，都能获得流畅的使用体验
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                了解更多
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>开源项目</CardTitle>
              <CardDescription>基于Next.js和Shadcn UI</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                这是一个开源项目，你可以在GitHub上查看源代码
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                查看源码
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}