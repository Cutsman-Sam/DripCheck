package DoneWithIt.app.objects;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import java.time.LocalDate;
import java.io.ByteArrayOutputStream;
import java.awt.image.BufferedImage;

public class User {
    public String username;
    public ArrayList<Outfit> closet;
    public Calendar calendar;
    public byte[] profilePic;
    public String gmail;
    public LocalDate dateCreated;
    public ArrayList<User> follows;

    // Used for first time creation of a user.
    public User(String gmail) {
        dateCreated = LocalDate.now();
        this.gmail = gmail;
        username = gmail.substring(0, gmail.indexOf("@"));
        closet = new ArrayList<Outfit>();
        calendar = new Calendar();
        try {
            BufferedImage image = ImageIO.read(new File("DoneWithIt\\app\\assets\\blank-profile-pic.png"));
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            profilePic = baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        follows = new ArrayList<>();
    }
    // Used when returning user's data from database is received.

    public User(String username, ArrayList<Outfit> closet, Calendar calendar, int numOutfits, byte[] profilePic,
            String gmail, LocalDate dateCreated) {
        this.username = username;
        this.closet = closet;
        this.calendar = calendar;
        this.profilePic = profilePic;
        this.gmail = gmail;
        this.dateCreated = dateCreated;
    }

    // User methods

    public int numOutfits() {
        return closet.size();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public ArrayList<Outfit> getCloset() {
        return closet;
    }

    public Calendar getCalendar() {
        return calendar;
    }

    public String getGmail() {
        return gmail;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public boolean addOutfit(Outfit o) {
        return closet.add(o);
    }

    public boolean removeOutfit(Outfit o) {
        return closet.remove(o);
    }

    public boolean deleteAccount() {
        // TODO:remove account from database
        return false;
    }
}
