package com.sellent.web.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FileController {

    @PostMapping("/file")
    public boolean uploadFile(List<MultipartFile> files) throws IllegalStateException, IOException {
        String UPLOAD_PATH = "/Users/pizzay/Documents/sellent/sellent/web/src/main/frontend/src/image" + new Date().getTime(); // 업로드 할 위치 // 현재 날짜 값 폴더

        try {
            for (int i = 0; i < files.size(); i++) {

                String originName = files.get(i).getOriginalFilename(); // 파일.type
                String[] tempStr = originName.split(".");
                originName = tempStr[0];
                String type = tempStr[1];

                File newFile = new File(UPLOAD_PATH, originName + "." + type); // 경로/파일.type

                if (!newFile.exists()) { // 폴더가 없을 경우 폴더 만들기
                    newFile.mkdirs();
                }

                files.get(i).transferTo(newFile);
                // transferTo(File file) > multipartFile을 주어진 file의 경로로 이동 (copy)
            }

        } catch (IOException e) {
            System.out.println(e);
            return false;
        }

        return true;
    }
    @GetMapping(value = "file/{id}/{name}",
            produces = MediaType.IMAGE_JPEG_VALUE // content-type
    )

    public ResponseEntity<byte[]> test(@PathVariable("id") Integer id, @PathVariable("name") String name) throws IOException {
        String DATA_DIRECTORY = "v";

        InputStream imageStream = new FileInputStream(
                DATA_DIRECTORY + "/" + name);
        //파일 이름으로 읽어올 파일의 경로 설정

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int read;
        byte[] imageByteArray = new byte[imageStream.available()];
        while ((read = imageStream.read(imageByteArray, 0, imageByteArray.length)) != -1) {
            buffer.write(imageByteArray, 0, read);
        }
        buffer.flush();
        byte[] targetArray = buffer.toByteArray();
        imageStream.close();

        return new ResponseEntity<byte[]>(targetArray, HttpStatus.OK);
    }
}
