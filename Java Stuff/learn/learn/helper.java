package learn;

public class helper {
    protected int y;

    public helper (int base) {
        y = base;
    }   

    public long power (int j) {
        long result = 1;
        for (int i = 0; i < j; ++i) {
            result *= y;
        }
        return result;
    }
}
