import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-bold my-7">Create Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select id="category">
            <option value="uncatogorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div
          className="flex gap-4 items-center justify-between border-4
         border-teal-500 border-dotted p-3"
        >
          <FileInput type="file" id="image" accept="image/*" />
          <Button
            type="button"
            className="bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-600"
            outline
          >
            Upload Image{" "}
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          id="content"
          placeholder="Write something amazing..."
          className="h-72 mb-12"
          required
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-600"
        >
            Publish
        </Button>
      </form>
    </div>
  );
}
