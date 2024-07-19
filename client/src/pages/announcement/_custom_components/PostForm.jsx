import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, Eye } from "lucide-react";

export function PostForm() {
  const [announcement, setAnnouncement] = useState({
    visibility: "Public",
    title: "Announcement From MDRRMO",
    message: "",
    mediaFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mediaFile") {
      setAnnouncement((prevAnnouncement) => ({
        ...prevAnnouncement,
        mediaFile: files[0],
      }));
    } else {
      setAnnouncement((prevAnnouncement) => ({
        ...prevAnnouncement,
        [name]: value,
      }));
    }
  };

  return (
    <div className="grid h-screen w-full sm:px-[56px]">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Announcement</h1>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Announcement Details
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue placeholder="Select who can see this announcement." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="grid gap-3">
                  <Label htmlFor="content">Title/Header</Label>
                  <Textarea
                    id="content"
                    placeholder="Announcement Title..."
                    className="min-h-[9.5rem]"
                  />
                </div> */}
                <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={announcement.message}
                    onChange={handleInputChange}
                    placeholder="Type additional detail here..."
                    className="min-h-60 resize-none border-0 p-3 shadow-none focus-visible:ring-0 w-full"
                  />
                  <div className="flex items-center p-3 pt-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" type="button">
                            <input
                              type="file"
                              id="mediaFile"
                              name="mediaFile"
                              accept="image/*, video/*"
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <label
                              htmlFor="mediaFile"
                              className="ml-2 cursor-pointer"
                            >
                              <Paperclip className="size-4" />
                              <span className="sr-only">Attach file</span>
                            </label>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                      Post Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.293 4.293a1 1 0 00-1.414-1.414L6 10.586V7a1 1 0 10-2 0v6a1 1 0 001 1h6a1 1 0 000-2H7.414l5.879-5.879a1 1 0 10-1.414-1.414L6 12.172l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </form>
              </fieldset>
            </form>
          </div>
          <div className=" relative sm:flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className=" flex-1 p-4 border rounded-lg overflow-y-auto">
              <h2 className="text-lg font-semibold mb-2">Preview:</h2>
              <div className="flex items-center mb-2">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                <p>Visibility: {announcement.visibility}</p>
              </div>
              {/* <h3 className="text-xl font-bold mt-4 mb-2">
                {announcement.title}
              </h3> */}
              <p>{announcement.message}</p>

              {announcement.mediaFile && (
                <div className="mt-4">
                  {announcement.mediaFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(announcement.mediaFile)}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  ) : announcement.mediaFile.type.startsWith("video/") ? (
                    <video controls className="max-w-full">
                      <source
                        src={URL.createObjectURL(announcement.mediaFile)}
                        type={announcement.mediaFile.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p>Unsupported file type</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
