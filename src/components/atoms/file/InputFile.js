import Button from "../button";

const InputFile = (props) => {
    let reader = new FileReader();

    const handleInputChange = (event) => {
        const imageFile = event.target.files[0];
        if (!imageFile) {
            console.log('Please select image.');
            return false;
        }

        const randomString = Math.random().toString(36).substring(2, 8);
        const fileName = Date.now() + '-' + randomString + '.webp';

        if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif|webp)$/)) {
            console.log('Please select valid image JPG,JPEG,PNG');
            return false;
        }
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {

                //------------- Resize img code ----------------------------------
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = img.width;
                var MAX_HEIGHT = img.height;
                var width = MAX_WIDTH;
                var height = MAX_HEIGHT;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var context = canvas.getContext("2d");
                context.drawImage(img, 0, 0, width, height);
                context.canvas.toBlob((blob) => {
                    const file = new File([blob], fileName, {
                        type: "image/webp",
                        lastModified: Date.now()
                    });
                    // console.log(`${MAX_WIDTH}x${MAX_HEIGHT}`);
                    const dataBatch = {
                        file: file,
                        dimention: `${MAX_WIDTH}x${MAX_HEIGHT}`,
                        preview: URL.createObjectURL(file),
                        width: MAX_WIDTH,
                        height: MAX_HEIGHT,
                    }
                    props.onChange && props.onChange(dataBatch);
                }, "image/webp", 0.99);
            };
            img.onerror = () => {
                console.log('Invalid image content.');
                return false;
            };
            //debugger
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-start">
                <Button className="border hover:bg-slate-100 relative">
                    <input type="file" accept="image/*" className="absolute left-0 top-0 right-0 bottom-0 border opacity-0 cursor-pointer w-full" onChange={(event) => handleInputChange(event)} />
                    Unggah Photo
                </Button>
            </div>
            {props.error && <small className="text-red-800 pl-1">{props.error}</small>}
        </div>
    );
}
export default InputFile;