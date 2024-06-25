import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


function App() {
    return (
        <>
            <div className="p-4">
                <Button>Click me</Button>
            </div>
            <Sheet>
                <SheetTrigger className="bg-black text-white p-4 px-10 rounded-2xl">Open</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                            let's gooo
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>

    )
}

export default App
