class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }

    return FirebaseService.instance;
  }

  public sayHello(): void {
    return console.log(
      'im kept here because in my previous lives, i had a lot of issues'
    );
  }
}

export { FirebaseService };
