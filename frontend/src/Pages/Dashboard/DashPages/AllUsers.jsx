import React, { useEffect, useState } from "react";
import { Button, DeleteAccount, Loader, PageTitle } from "../../../Components/CompsIndex.js";
import { API } from "../../../API/API.js";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false)
  const [showMore, setShowMore] = useState(false);
  const [firstFetchDone, setFirstFetchDone] = useState(false);
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    const getUsers = async () => {
      try {
        if (!firstFetchDone) setLoading(true);
        const { data } = await API.get("/user/get-users");
        if (data) {
          const usersInfo = data.data?.users || [];
          const totalUsers = data.data?.totalUsers || 0

          setUsers(usersInfo);
          setFetchCount(usersInfo.length)
          setTotalUsers(totalUsers)
          setShowMore(usersInfo.length < totalUsers);
        }
      } catch (error) {
        console.error(error)
        console.log(error.response?.data?.message || "Failed to fetch users! Try again.");
      } finally {
        setLoading(false);
        setFirstFetchDone(true);
      }
    };
    getUsers();
  }, [refresh]);

  const handleShowMore = async () => {
    const setStartIndex = users.length;
    try {
      setLoadingMore(true)
      const { data } = await API.get(`/user/get-users?setStartIndex=${setStartIndex}`);
      if (condition) {
        const moreUsersInfo = data.data?.users || [];

        setUsers((prev) => [...prev, ...moreUsersInfo]);
        setFetchCount((prev) => prev + moreUsersInfo.length)
        setShowMore(users.length + moreUsersInfo.length < totalUsers);
      }
    } catch (error) {
      console.error(error)
      console.log(error.response?.data?.message || "Failed to fetch more users! Try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
    <PageTitle title="All Users" />
      {loading && <Loader />}
      {users.length > 0 ? (

        <div className="mt-12 lg:mt-0 w-sm md:w-lg lg:w-7xl">
          <div className="overflow-x-auto overflow-y-auto border-none shadow-md shadow-base-content rounded-sm">
            <table className="table text-nowrap">
              <thead className="bg-base-300 text-lg text-base-content">
                <tr>
                  <th>No.</th>
                  <th>Created At</th>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>E-Mail</th>
                  <th className="text-error">Delete</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.username} />
                    </td>
                    <td className="flex flex-col">
                      {user.isAdmin && (
                        <span className="text-info">
                          Admin
                        </span>
                      )}
                      <Link to={`?tab=profile/${user._id}`} className="link-hover">
                        {user.username}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td >
                      {user.isAdmin ?
                        "" : <DeleteAccount
                          userId={user._id}
                          className="text-error" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          {showMore && (
            <Button
              onClick={handleShowMore}
              text={loading ? <Loader /> : "Show More Users"}
              style="imp"
              className="mt-4"
            />
          )}
        </div>
      ) : (
        !loading &&
        firstFetchDone && (
          <div className="font-bold text-3xl text-center mt-8">
            We Dont't Have Any Users Yet!
          </div>
        )
      )}
    </>
  );
};

export default AllUsers;
