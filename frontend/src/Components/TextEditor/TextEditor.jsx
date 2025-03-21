import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ value, onChange, className = "", ...props }) => {
    return (
        <div className={`w-full rounded-lg ${className}`} {...props}>
            <Editor
                apiKey="0n015v2xzue7wwz15uxv6czykap3wcqvxbneeqh8mc17vqib"
                init={{
                    height: 400,
                    menubar: true,
                    plugins: ["lists", "link", "preview", "advlist", "wordcount", "code"],
                    toolbar: `
                        undo redo | bold italic underline forecolor backcolor | 
                        alignleft aligncenter alignright alignjustify | bullist numlist | link image preview | 
                        removeformat
                    `,
                }}
                value={value} 
                onEditorChange={onChange} 
            />
        </div>
    );
};

export default TextEditor;
