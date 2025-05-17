import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ColorsPage() {
  return (
    <div className="flex-1 container max-w-6xl py-10 px-4">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Colors</h1>
          <p className="text-xl text-muted-foreground">Monochrome color palette for ChadCn UI components.</p>
        </div>

        <Tabs defaultValue="light" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="light">Light Mode</TabsTrigger>
            <TabsTrigger value="dark">Dark Mode</TabsTrigger>
          </TabsList>

          <TabsContent value="light" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Background</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 100%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-background border"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Foreground</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 3.9%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-foreground"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Primary</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 9%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-primary"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Secondary</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 96.1%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-secondary"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Muted</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 96.1%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-muted"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Accent</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 96.1%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-accent"></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dark" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Background</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 3.9%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-black border border-white/10"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Foreground</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 98%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-white"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Primary</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 98%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-white"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Secondary</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 14.9%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-zinc-800"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Muted</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 14.9%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-zinc-800"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Accent</h3>
                  <span className="text-sm text-muted-foreground">hsl(0 0% 14.9%)</span>
                </div>
                <div className="h-24 w-full rounded-md bg-zinc-800"></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
