package DoneWithIt.app.objects;

import java.time.LocalDate;

public class Outfit {
    public byte[] image;
    public LocalDate dateCreated;
    public String name;
    // Sprint 2: add tags

    public Outfit(byte[] image, String name) {
        dateCreated = LocalDate.now();
    }

    public boolean upload(String postmsg) {
        // TODO: implement uploading
        return false;
    }

}