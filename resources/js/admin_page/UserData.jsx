import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from "../components/Modal"
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import UserDetails from "./UserDetails";
import UserEdit from "./UserEdit";

const UserData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedData, setSelectedData] = useState(false);
    const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isExporting, setIsExporting] = useState(false);

    const BASE_URL = "http://167.86.81.253/storage/";
    const [submittedFilters, setSubmittedFilters] = useState({});
    const [filters, setFilters] = useState({
        search_query: "",
        start_date: null,
        end_date: null,
    });

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/fetch/user-data",{
                params: { 
                    ...submittedFilters,
                    page: currentPage,
                },
            });
            const users = response.data.users?.data || [];

            const processedUsers = users.map((user) => ({
                ...user,
                idcard_front_url: user.idcard_front ? `${BASE_URL}${user.idcard_front}` : null,
                idcard_back_url: user.idcard_back ? `${BASE_URL}${user.idcard_back}` : null,
                applicant_signature_url: user.applicant_signature ? `${BASE_URL}${user.applicant_signature}` : null,
                guarantor_idcard_back_url: user.guarantor_idcard_back ? `${BASE_URL}${user.guarantor_idcard_back}` : null,
                guarantor_idcard_front_url: user.guarantor_idcard_front ? `${BASE_URL}${user.guarantor_idcard_front}` : null,
                guarantor_signature_url: user.guarantor_signature ? `${BASE_URL}${user.guarantor_signature}` : null,
            }));

            setUserData(processedUsers);
            setCurrentPage(response.data.users.current_page);
            setLastPage(response.data.users.last_page);
            setTotal(response.data.users.total);
        } catch (error) {
            console.error("Error fetching user data:", error.message || error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [submittedFilters, currentPage]);

    const handleOpenModal = (userData) => {
        setSelectedUser(userData); // Set the user data to pass to the modal
        setOpenModal(true); // Open the modal
    };

    const handleOpenEditModal = (userData) => {
        setSelectedUser(userData); // Set the user data to pass to the modal
        setOpenEditModal(true); // Open the modal
    };

      const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
          setCurrentPage(page);
        }
      };
    
      const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-2.5 border rounded-md ${
                currentPage === i
                  ? "bg-[#08446A] text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {i}
            </button>
          );
        }
        return pages;
      };

    const handleExport = async () => {
        setIsExporting(true)
        try {
            const response = await axios.get("/api/export", {
            params: { query: filters.search_query || "" },
            responseType: "blob", // Handle binary data
            });

            // Create a Blob and trigger download
            const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "data.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setIsExporting(false)
        } catch (error) {
            console.error("Error exporting data:", error);
            setIsExporting(false)
        }
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
        <div className="w-full relative flex flex-col bg-white min-h-screen">
            <div className="fixed w-full top-0 flex bg-white py-1.5 px-4 shadow-md z-50 shadow-gray-400">
                <div className="flex items-center space-x-2">
                    <img src="/images/uniqLogo.png" alt="" className="w-12"/>
                    <div className="font-bold text-[#08446A]">
                        <p className="-mb-1 text-xl">UNIQ MICRO</p>
                        <p className="text-sm font-semibold">CREDIT SRL, <span>Brescia - Italy</span></p>
                    </div>
                </div>
            </div>
            <img src="/images/125.jpg" alt="" className="w-full fixed top-12"/>
        
            <div className="w-[98vw] gap-[3vw] overflow-auto bg-white p-[1vw] table-cover scroll-width z-40 mx-auto mt-20 min-h-[70vh] border">
                <div className="w-full mb-2">
                    <form onSubmit={handleSubmit} className="flex flex-row gap-3 items-center mb-1">
                    <InputField
                        radius="none"
                        name="search_query"
                        placeholder="Search by users or guarantor details"
                        value={filters.search_query}
                        onChange={(e) => setFilters({ ...filters, search_query: e.target.value })}
                        className="w-1/3"
                    />
                    <div className="relative">
                        <input
                            type="date"
                            name="start_date"
                            value={filters.start_date}
                            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-sm border border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="floating_outlined" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Start Date</label>
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            name="end_date"
                            value={filters.end_date}
                            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-sm border border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="floating_outlined" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">End Date</label>
                    </div>
                    <div className="flex space-x-2">
                        <button
                        type="submit"
                        className="rounded-sm px-4 py-2.5 text-sm bg-red-600 flex items-center space-x-1 text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M5.5 5h13a1 1 0 0 1 .5 1.5L14 12v7l-4-3v-4L5 6.5A1 1 0 0 1 5.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Filter</p>
                        </button>
                        <button
                        type="button"
                        className="rounded-sm bg-slate-800 text-white flex space-x-1 items-center px-4 py-1.5 text-sm"
                        onClick={() => {
                            setFilters({
                                search_query: "",
                                start_date: "",
                                end_date: "",
                            });
                    
                            setSubmittedFilters({
                                search_query: "",
                                start_date: "",
                                end_date: "",
                            });
                    
                        }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path></svg>
                            <p>Clear</p>
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleExport}
                        disabled={isExporting}
                        className="rounded-sm px-4 py-2.5 text-sm bg-blue-600 text-white flex space-x-2 items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM575.34 477.84l-61.22 102.3L452.3 477.8a12 12 0 0 0-10.27-5.79h-38.44a12 12 0 0 0-6.4 1.85a12 12 0 0 0-3.75 16.56l82.34 130.42l-83.45 132.78a12 12 0 0 0-1.84 6.39a12 12 0 0 0 12 12h34.46a12 12 0 0 0 10.21-5.7l62.7-101.47l62.3 101.45a12 12 0 0 0 10.23 5.72h37.48a12 12 0 0 0 6.48-1.9a12 12 0 0 0 3.62-16.58l-83.83-130.55l85.3-132.47a12 12 0 0 0 1.9-6.5a12 12 0 0 0-12-12h-35.7a12 12 0 0 0-10.29 5.84z" fill="currentColor"></path></svg>
                            {isExporting ? (
                                <div className="flex items-center gap-2">
                                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                                    <span>Exporting...</span>
                                </div>
                            ) : (
                                "Export"
                            )}
                    </button>
                    </form>
                </div>
                <table className="w-full border-collapse relative">
                    <thead className="bg-[#08446A] text-white font-normal sticky top-0 z-[20]">
                        <tr className="text-left">
                        <th className="px-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">
                            User
                            </h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">Telephone</h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">Nationality</h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">ID Card</h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">Profession</h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">Loan Purpose</h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">Guarantor</h4>
                        </th>
                        <th className="pr-3 py-3.5 border-b">
                            <h4 className="font-medium text-base">Action</h4>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="w-full odd:bg-white even:bg-gray-100 text-sm">
                        {!isLoading ? (
                        <>
                            {userData?.length === 0 ? (
                            <tr>
                                <td colSpan={9} rowSpan={5}>
                                <div className="w-full flex flex-col justify-center items-center">
                                    <img
                                    src="/assets/img/no-data.svg"
                                    alt=""
                                    className="w-24"
                                    />
                                    <h4 className="text-base py-6 font-[600]">
                                    No Data Available
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
                                            className="w-10 h-10 object-cover rounded-full border"
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
                                        {user?.nationality}
                                    </td>
                                    <td className="py-[1vw] border-b">
                                        {user?.id_type}
                                    </td>
                                    <td className="py-[1vw] border-b">
                                        {user?.profession}
                                    </td>
                                    <td className="py-[1vw] border-b">
                                        {user?.loan_purpose}
                                    </td>
                                    <td className="py-[1vw] border-b">
                                        {user?.guarantor_first_name} {user?.guarantor_surname}
                                    </td>

                                    <td className="px-[1vw] border-b">
                                        <div className="flex space-x-3">
                                            <button size="sm"
                                                    className='text-green-600 flex items-center justify-center'
                                                    onClick={() => handleOpenEditModal(user)}
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none">
                                                    <path d="M11.698 5.131l.959-.959a2 2 0 0 0-2.829-2.828L2.442 8.73a2.5 2.5 0 0 0-.658 1.161l-.572 2.291a.5.5 0 0 0 .606.607l2.291-.573a2.5 2.5 0 0 0 1.02-.526A5.52 5.52 0 0 1 5 10.414l-.438.437a1.5 1.5 0 0 1-.697.395l-1.482.37l.37-1.482a1.5 1.5 0 0 1 .395-.697l5.972-5.972l1.414 1.414l-.122.122a5.588 5.588 0 0 1 1.285.13zm-1.87-2.373l.708-.707a1 1 0 1 1 1.414 1.414l-.708.707l-1.414-1.414zM15 10.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0zM9.604 7.897a.5.5 0 0 0-.708 0l-1.75 1.75a.498.498 0 0 0-.002.705l1.752 1.752a.5.5 0 1 0 .708-.707l-.897-.896h1.543c.966 0 1.75.783 1.75 1.75v.25a.5.5 0 0 0 1 0v-.25a2.75 2.75 0 0 0-2.75-2.75H8.707l.897-.897a.5.5 0 0 0 0-.707z" fill="currentColor"></path></g>
                                                </svg>  
                                            </button>
                                            <button size="sm"
                                                className='text-blue-600 flex items-center justify-center'
                                                onClick={() => handleOpenModal(user)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-info-circle-fill w-5 h-5" viewBox="0 0 16 16">
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                            </svg>  
                                            </button>
                                            <button size="sm"
                                                className='text-red-600 flex items-center justify-center'
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3-fill w-5 h-5" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                            </button>
                                            
                                            
                                        </div>
                                        
                                    </td>
                                    </tr>
                                );
                                })}
                            </>
                            )}
                        </>
                        ) : (
                        <tr>
                            <td colSpan={9} rowSpan={5}>
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
            <div className="w-full flex justify-end items-center md:gap-[1vw] gap-[3vw] md:mt-[1vw] mt-[4vw] z-50 pr-6">
                <h4 className="md:text-[1vw] text-[3.5vw]">
                Page <span>{currentPage}</span> of{" "}
                <span>{lastPage}</span>
                </h4>
                <div className="flex md:gap-[1vw] gap-[3vw]">
                <button
                    disabled={currentPage === 1}
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] rounded-[50%] bg-[#d0d0d0] flex justify-center items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-700 rotate-180" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M10.02 18l6-6l-6-6l-1.41 1.41L13.19 12l-4.58 4.59z" fill="currentColor"></path></svg>
                </button>
                {renderPageNumbers()}
                <button
                    type="button"
                    disabled={currentPage === lastPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] rounded-[50%] bg-[#d0d0d0] flex justify-center items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-700" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M10.02 18l6-6l-6-6l-1.41 1.41L13.19 12l-4.58 4.59z" fill="currentColor"></path></svg>
                </button>
                </div>
            </div>
            <UserDetails
                setOpenModal={setOpenModal}
                openModal={openModal}
                userData={selectedUser}
            />

            <UserEdit
                setOpenModal={setOpenEditModal}
                openModal={openEditModal}
                userData={selectedUser}
                fetchUserData={fetchUserData}
            />
            
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
