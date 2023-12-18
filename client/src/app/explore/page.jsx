"use client";

import { useSelector, useDispatch } from "react-redux";
import { getAllArtists } from "../redux/features/artists/artistActions";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Nav from "../../components/nav/Nav";
import { getAllStyles } from "../redux/features/styles/stylesActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import FilterSideBar from "../../components/filterSideBar/FilterSideBar";
import Paginate from "../../components/paginate/Paginate";
import { orderRating } from "../utils/ordenarRaiting";
import "../explore/page.css";
import Link from "next/link";

export default function ExplorePage() {
  const { people, filtered } = useSelector((state) => state.artists);

  const dispatch = useDispatch();

  const styles = useSelector((state) => state.styles.names);
  const [filters, setFilters] = useState({
    location: "",
    tattoStyle: [],
  });

  useEffect(() => {
    dispatch(getAllStyles());
    dispatch(getAllArtists());
    setFilterSidebarVisible(true);
  }, []);

  const artistConPubli = filtered.filter((ar) => ar.publications.length > 0);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const artistsToDisplay = artistConPubli.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );
  const totalArtists = artistConPubli.length;
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [filterSidebarVisible, setFilterSidebarVisible] = useState(false);

  const handleToggleFilterSidebar = () => {
    setFilterSidebarVisible(!filterSidebarVisible);
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  //msj
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (artistConPubli.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [artistConPubli]);

  return (
    <div className="max-w-full bg-secondary-900">
      <Nav />

      <div className="max-w-full">
        <div className="flex flex-col w-full justify-center items-center gap-x-1 text-center">
          <div className="w-[80%] sm:flex sm:flex-col sm:justify-center sm:items-center">
            <div className="w-full mb-9">
              <h2 className="font-bold  text-[50px] font-newrocker  text-artistfont">
                Bienvenidos al Reino de la Inspiracion
                <span className="text-primary"> Ink</span>orporada!
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-4 sm:w-full w-full">
              <div className="flex items-center sm:w-full mb-4">
                <p className="text-center text-[20px] text-artistfont sm:w-full">
                  En nuestro santuario del arte corporal, cada trazo cuenta una
                  historia, cada línea lleva consigo la esencia de un viaje
                  personal. En el lienzo de la piel, exploramos la intersección
                  entre la imaginación y la realidad, transformando ideas en
                  tatuajes que resuenan con significado.
                </p>
              </div>

              <div className="flex rounded-lg  shadow-2xl  w-full relative  overflow-hidden">
                <img
                  className="absolute w-full h-full object-cover"
                  src="https://media.istockphoto.com/id/1320388570/es/foto/manos-de-un-tatuador-con-guantes-negros-y-sosteniendo-una-máquina.jpg?s=612x612&w=0&k=20&c=20XaUXZaEiJ8C0877TxICFtvgwaBfmIiUoYWXVVSmxg="
                />
                <div className="w-full h-full bg-black opacity-60 absolute">
                  {" "}
                </div>
                <Swiper
                  spaceBetween={30}
                  parallax={true}
                  centeredSlides={true}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Parallax, Autoplay, Pagination, Navigation]}
                  className="w-full flex justify-center items-center relative text-center p-5 h-[350px] "
                >
                  <SwiperSlide className=" mt-[150px] font-bold text-[20px]  w-[50%] text-artistfont">
                    Un tatuaje no solo decora tu piel, sino que también cuenta
                    tu historia en las líneas más simples.{" "}
                  </SwiperSlide>{" "}
                  <SwiperSlide className="mt-[150px] font-bold text-[20px]  w-[50%] text-artistfont ">
                    En la poesía de la tinta, cada tatuaje es una estrofa, cada
                    estrofa es una expresión. ¿Cuál será tu próximo verso?{" "}
                  </SwiperSlide>{" "}
                  <SwiperSlide className="mt-[150px] font-bold text-[20px]  w-[50%] text-artistfont">
                    Palabras que perduran, una vida de significado. Exprésate
                    con precisión, deja que tu piel hable por ti.{" "}
                  </SwiperSlide>
                  //{" "}
                  <SwiperSlide className="mt-[150px] font-bold text-xl sm:text-m w-full text-artistfont  ">
                    Tus tatuajes son testigos permanentes de lo que te motiva y
                    te inspira a diario.{" "}
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-[50px] border-primary/40 ml-[50px] mr-[50px]"></hr>

        <div className="flex max-w-full ">
          <div className="w-full flex flex-col md:flex-row justify-center mt-8 lg:ml-10 ml-5 my-4 gap-x-4">
            <div className="md:w-[400px] w-[90%] flex flex-col items-center">
              <button
                onClick={handleToggleFilterSidebar}
                className="sm:inline-block md:hidden text-white text-xl mb-4"
              >
                {filterSidebarVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
              </button>
              {filterSidebarVisible && (
                <FilterSideBar onFilterChange={resetToFirstPage} />
              )}
            </div>

            <div className="scroll-fade flex max-w-full flex-wrap gap-x-2">
              <div className=" flex flex-col items-center scroll-content w-full  ">
                {noResults ? (
                  <p className="text-primary text-center mt-[180px] font-rocksalt text-2xl ">
                    ¡No se encontraron coincidencias con tu búsqueda!
                  </p>
                ) : (
                  <div className="max-w-full flex flex-col p-2">
                    <Paginate
                      artistsPerPage={artistsPerPage}
                      totalArtists={totalArtists}
                      currentPage={currentPage}
                      onPageChange={onPageChange}
                    />
                    {artistsToDisplay?.map((filter) => (
                        <Card
                          id={filter.id}
                          fullName={filter.fullName}
                          location={filter.location}
                          shopName={filter.shopName}
                          publications={filter.publications}
                          image={filter.image}
                          reviews={filter.reviews}
                        />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
