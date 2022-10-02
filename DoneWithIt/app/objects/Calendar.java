package DoneWithIt.app.objects;

import java.time.LocalDate;
import java.util.ArrayList;

public class Calendar {
    public ArrayList<Day> days;

    // Day Object
    class Day {
        public LocalDate date;
        public Outfit outfit;
        public String notes;

        public Day(Outfit outfit, String notes) {
            date = LocalDate.now();
            this.outfit = outfit;
            this.notes = notes;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public Outfit getOutfit() {
            return outfit;
        }

        public void setOutfit(Outfit outfit) {
            this.outfit = outfit;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

    }

    // Calendar Functions
    public Calendar() {
        days = new ArrayList<Day>();
    }

    public boolean addDay(Day d) {
        return days.add(d);
    }

    public boolean removeDay(Day d) {
        return days.remove(d);
    }

}
