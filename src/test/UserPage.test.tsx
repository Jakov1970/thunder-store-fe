import { userInfoAction } from "../store/actions/user-actions";

describe("user info", () => {
  it("should return some data", () => {
    expect(userInfoAction({ jwt: null })).toHaveLength(1);
  });
});
