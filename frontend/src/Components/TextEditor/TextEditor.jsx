import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ onChange, className="", ...props }) => {
    return (
        <div className={`w-full rounded-lg ${className}`} {...props}>
            {/* TinyMCE Editor */}
            <Editor
                apiKey="0n015v2xzue7wwz15uxv6czykap3wcqvxbneeqh8mc17vqib" // ✅ Keep your secret key
                init={{
                    height: 300,
                    menubar: true,
                    plugins: ["lists", "link", "preview", "advlist", "wordcount", "code"],
                    toolbar: `
                        undo redo | bold italic underline forecolor backcolor | 
                        alignleft aligncenter alignright alignjustify |bullist numlist | link image preview | 
                        removeformat
                    `,
                }}
                onEditorChange={onChange}
                initialValue="Write YourWORDS here..."
            />
        </div>
    );
};

export default TextEditor;
