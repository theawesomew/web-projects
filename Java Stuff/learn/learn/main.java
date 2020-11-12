package learn;

class QuickStart {
    public static void main (final String[] args) {
        helper myHelper = new helper(3);
        System.out.println(myHelper.y);
        System.out.println(myHelper.power(10));
    }
}