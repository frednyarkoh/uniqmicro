import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from "../components/Modal"
import toast from "react-hot-toast";
import InputField from "../components/InputField";

const UserData = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedData, setSelectedData] = useState(false);
    const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
    const BASE_URL = "http://127.0.0.1:8000/storage/";
    const [submittedFilters, setSubmittedFilters] = useState({});
    const [filters, setFilters] = useState({
        search_query: "",
    });

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/fetch/user-data",{
                params: { 
                    ...submittedFilters,
                    page: pageNumber,
                },
            });
            const users = response.data.users?.data || [];

            const processedUsers = users.map((user) => ({
                ...user,
                idcard_front_url: user.idcard_front ? `${BASE_URL}${user.idcard_front}` : null,
                idcard_back_url: user.idcard_back ? `${BASE_URL}${user.idcard_back}` : null,
            }));

            setUserData(processedUsers);
        } catch (error) {
            console.error("Error fetching user data:", error.message || error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [submittedFilters, pageNumber]);

    const handleExportLogs = () => {
        setIsExportReload(true);
    
        toast.success("Your data will be exported soon", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    
        const apiUrl = `http://127.0.0.1/api/system-logs/export`;
        const params = new URLSearchParams({
            page: 1,
            selectedFrom: selectedFrom != "" ? selectedFrom : currentDate,
            selectedTo: selectedTo != "" ? selectedTo : currentDate,
            user_id: user?.user?.id,
        });
    
        if (searchValue !== undefined && searchValue !== "")
            params.append("search_query", searchValue);
    
        const finalUrl = `${apiUrl}?${params.toString()}`;
    
        setTimeout(() => {
            window.location.replace(finalUrl);
            setIsExportReload(false);
        }, 3000);
    };

    const handleDeleteClick = (user) => {
        setSelectedData(user);
        toggleDeleteDrawer();
    }
    const toggleDeleteDrawer = () => setIsDeleteDrawerOpen(!isDeleteDrawerOpen)

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedFilters({ ...filters });
        setPageNumber(1);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full xl:w-[90%] md:mt-[1vw] mt-[6vw]">
                <div className="flex space-x-4 font-bold text-2xl mb-1 uppercase">
                    <img src="/images/uniqLogo.png" alt="" className="w-16 h-16"/>
                    <p className="self-end text-gray-800">Customer Credit Application Data</p>
                </div>
                <div className="w-full md:min-h-[40vw] min-h-[100vw] gap-[3vw] overflow-auto bg-[#f8f8f8] p-[1vw] table-cover scroll-width">
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="flex flex-row gap-3 items-center mb-1">
                    <InputField
                        radius="none"
                        name="search_query"
                        placeholder="Search by faculty name or short name"
                        value={filters.search_query}
                        onChange={(e) => setFilters({ ...filters, search_query: e.target.value })}
                       
                        className="w-1/2"
                    />
                    <div className="flex space-x-2">
                        <button
                        type="submit"
                        className="rounded-sm px-4 py-1.5 text-sm bg-red-600 text-white"
                        >
                        Filter
                        </button>
                        <button
                        type="button"
                        className="rounded-sm bg-slate-800 text-white px-4 py-1.5 text-sm"
                        onClick={() => {
                            setFilters({
                            search_query: "",
                            });
                    
                            setSubmittedFilters({
                            search_query: "",
                            });
                    
                        }}
                        >
                        Clear
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="rounded-sm px-4 py-1.5 text-sm bg-blue-600 text-white"
                        >
                        Export Data
                    </button>
                    </form>
                </div>
                    <table className="w-full border-collapse md:text-[0.9vw] text-[3.5vw] relative">
                        <thead className="bg-white sticky top-0 z-[20]">
                            <tr className="text-left">
                            <th className="md:py-[1vw] py-[3vw] md:px-[1vw] px-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">
                                User
                                </h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">Telephone</h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">Date of Birth</h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">Nationality</h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">ID Card</h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">Profession</h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">Guarantor</h4>
                            </th>
                            <th className="md:py-[1vw] py-[3vw] border-b">
                                <h4 className="md:text-[1vw] text-[3.5vw]">Action</h4>
                            </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {!isLoading ? (
                            <>
                                {userData?.length === 0 ? (
                                <tr>
                                    <td colSpan={7} rowSpan={5}>
                                    <div className="w-full h-[35vw] flex flex-col justify-center items-center">
                                        <img
                                        src="/assets/img/no-data.svg"
                                        alt=""
                                        className="w-[10vw]"
                                        />
                                        <h4 className="md:text-[1vw] text-[3.5vw] font-[600]">
                                        No Log Available
                                        </h4>
                                    </div>
                                    </td>
                                </tr>
                                ) : (
                                <>
                                    {userData?.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                        <td className="py-[1vw] pl-2 border-b">
                                        <h4 className="flex items-center space-x-2">
                                            <img
                                                src={user.idcard_front_url}
                                                alt="ID Card Front"
                                                className="w-8 h-8 object-cover rounded-full border"
                                            />
                                            <div>
                                                <p className="font-semibold text-sm">{user?.first_name} {user?.surname}</p>
                                                <p>{user?.email}</p>
                                            </div>
                                            
                                        </h4>
                                        </td>
                                        <td className="py-[1vw] border-b">
                                            {user?.telephone}
                                        </td>
                                        <td className="py-[1vw] border-b">
                                            {user?.date_of_birth}
                                        </td>

                                        <td className="py-[1vw] border-b">
                                            {user?.nationality}
                                        </td>
                                        <td className="py-[1vw] border-b">
                                            {user?.id_type}
                                        </td>
                                        <td className="py-[1vw] border-b">
                                            {user?.profession}
                                        </td>
                                        <td className="py-[1vw] border-b">
                                            {user?.guarantor_first_name} {user?.guarantor_surname}
                                        </td>

                                        <td className="px-[1vw] border-b">
                                            <button size="sm"
                                                className='text-red-600 flex items-center justify-center'
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                            </button>
                                        </td>
                                        </tr>
                                    );
                                    })}
                                </>
                                )}
                            </>
                            ) : (
                            <tr>
                                <td colSpan={7} rowSpan={5}>
                                <div className="w-full h-[35vw] flex items-center justify-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </div>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-end items-center md:gap-[1vw] gap-[3vw] md:mt-[1vw] mt-[4vw]">
                    <h4 className="md:text-[1vw] text-[3.5vw]">
                    Page <span>{userData?.current_page}</span> of{" "}
                    <span>{userData?.last_page}</span>
                    </h4>
                    <div className="flex md:gap-[1vw] gap-[3vw]">
                    <button
                        type="button"
                        onClick={() => {
                        setPageNumber((prev) => Math.max(prev - 1, 1));
                        }}
                        className="md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] rounded-[50%] bg-[#d0d0d0] flex justify-center items-center"
                    >
                        <img
                        src="/assets/img/arr-b.svg"
                        alt=""
                        className="md:w-[1.1vw] w-[4vw]"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                        setPageNumber((prev) =>
                            Math.min(prev + 1, userData?.activityLogs?.last_page)
                        );
                        }}
                        className="md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] rounded-[50%] bg-[#d0d0d0] flex justify-center items-center"
                    >
                        <img
                        src="/assets/img/arr-f.svg"
                        alt=""
                        className="md:w-[1.1vw] w-[4vw]"
                        />
                    </button>
                    </div>
                </div>
            </div>
            {isDeleteDrawerOpen && (
                <DeleteUserModal
                    fetchUsers={fetchUserData}
                    isOpen={isDeleteDrawerOpen}
                    setIsDeleteOpen={toggleDeleteDrawer}
                    selectedData={selectedData}
                />
            )}
        </div>
    );
};


const DeleteUserModal = ({ fetchUsers, isOpen, setIsDeleteOpen, selectedData }) => {
    const [isSaving, setIsSaving] = useState(false);

    const handleDeleteUser = async (e, userId) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await axios.delete(`/api/user-data/${userId}`);
            toast.success(response.data.message);
            fetchUsers();
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error deleting block.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        isOpen && (
            <Modal
                closeModal={setIsDeleteOpen}
                title="Delete User Data"
                onSubmit={(e) => handleDeleteUser(e, selectedData?.id)}
                width="w-full md:w-2/3 lg:w-1/2"
                backColor="bg-red-600"
                command="Delete"
                isSaving={isSaving}
            >
                <div className="text-left font-medium text-sm">
                    Are you sure you want to delete this user data? This action cannot be reversed.
                </div>
                <div className="flex space-x-2 text-gray-600 mt-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-info-circle w-5 h-5" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                    <p className="font-normal">{selectedData?.first_name} {selectedData.surname}</p>
                </div>
            </Modal>
        )
    );
};

export default UserData;
