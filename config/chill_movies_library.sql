-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2025 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chill_movies_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `tipe` varchar(10) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `durasi_total` int(11) DEFAULT NULL,
  `tanggal_rilis` date DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `judul`, `tipe`, `deskripsi`, `genre_id`, `durasi_total`, `tanggal_rilis`, `rating`) VALUES
(1, 'Avengers: Endgame', 'movie', 'Para pahlawan berkumpul untuk mengalahkan Thanos.', 1, 180, '2019-04-26', 8.9),
(2, 'Stranger Things', 'series', 'Kejadian misterius di kota kecil dengan dunia terbalik.', 4, 50, '2016-07-15', 8.7),
(3, 'The Office', 'series', 'Kehidupan sehari-hari para pegawai kantor.', 2, 25, '2005-03-24', 8.5),
(4, 'Interstellar', 'movie', 'Perjalanan luar angkasa untuk menyelamatkan umat manusia.', 4, 169, '2014-11-07', 8.6),
(5, 'Parasite', 'movie', 'Keluarga miskin menyusup ke rumah orang kaya.', 3, 132, '2019-05-30', 8.5),
(6, 'Hereditary', 'movie', 'Rahasia kelam keluarga yang diwariskan.', 5, 127, '2018-06-08', 7.3),
(7, 'Inception', 'movie', 'Mimpi dalam mimpi dalam mimpi.', 4, 148, '2010-07-16', 8.8),
(8, 'Brooklyn Nine-Nine', 'series', 'Serial komedi tentang polisi di New York.', 2, 22, '2013-09-17', 8.4),
(9, 'Breaking Bad', 'series', 'Guru kimia jadi pengedar narkoba.', 3, 47, '2008-01-20', 9.5),
(10, 'Train to Busan', 'movie', 'Zombie outbreak di kereta menuju Busan.', 5, 118, '2016-07-20', 7.6),
(11, 'The Matrix', 'movie', 'Hidup adalah simulasi.', 4, 136, '1999-03-31', 8.7),
(12, 'The Conjuring', 'movie', 'Penyelidik paranormal membantu keluarga.', 5, 112, '2013-07-19', 7.5),
(13, 'Forrest Gump', 'movie', 'Kisah luar biasa dari pria biasa.', 3, 142, '1994-07-06', 8.8),
(14, 'The Boys', 'series', 'Superhero dikontrol oleh korporasi.', 1, 60, '2019-07-26', 8.7),
(15, 'The Big Bang Theory', 'series', 'Kehidupan ilmuwan geek.', 2, 22, '2007-09-24', 8.1),
(16, 'Dune', 'movie', 'Perjuangan kekuasaan di planet gurun.', 4, 155, '2021-10-22', 8.2),
(17, 'The Witcher', 'series', 'Pemburu monster dalam dunia fantasi.', 1, 60, '2019-12-20', 8.2),
(18, 'Inside Out', 'movie', 'Petualangan emosi dalam pikiran seorang gadis.', 2, 95, '2015-06-19', 8.1),
(19, 'The Pianist', 'movie', 'Kisah nyata pianis Polandia di masa Holocaust.', 3, 150, '2002-09-25', 8.5),
(20, 'Arrival', 'movie', 'Ahli bahasa mencoba komunikasi dengan alien.', 4, 116, '2016-11-11', 7.9),
(21, 'The Babadook', 'movie', 'Ibu dan anak diteror oleh sosok misterius.', 5, 94, '2014-05-22', 6.8),
(22, 'Peaky Blinders', 'series', 'Geng kriminal Inggris pasca-WWI.', 3, 60, '2013-09-12', 8.8),
(23, 'The Mandalorian', 'series', 'Pemburu bayaran di dunia Star Wars.', 4, 40, '2019-11-12', 8.7),
(24, 'Joker', 'movie', 'Asal-usul tragis dari musuh Batman.', 3, 122, '2019-10-04', 8.5),
(25, 'A Quiet Place', 'movie', 'Keluarga bertahan hidup dari makhluk sensitif suara.', 5, 90, '2018-04-06', 7.5);

-- --------------------------------------------------------

--
-- Table structure for table `daftar_saya`
--

CREATE TABLE `daftar_saya` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `tanggal_ditambahkan` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `id` int(11) NOT NULL,
  `content_id` int(11) DEFAULT NULL,
  `judul_episode` varchar(100) DEFAULT NULL,
  `durasi` int(11) DEFAULT NULL,
  `episode_ke` int(11) DEFAULT NULL,
  `season` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `nama_genre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `nama_genre`) VALUES
(1, 'Action'),
(2, 'Comedy'),
(3, 'Drama'),
(4, 'Sci-Fi'),
(5, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `paket_id` int(11) DEFAULT NULL,
  `tanggal_order` datetime DEFAULT NULL,
  `tanggal_berakhir` datetime DEFAULT NULL,
  `status_pembayaran` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id` int(11) NOT NULL,
  `nama_paket` varchar(50) DEFAULT NULL,
  `harga` decimal(10,2) DEFAULT NULL,
  `durasi_berlaku` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `metode_pembayaran` varchar(50) DEFAULT NULL,
  `jumlah_bayar` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `tanggal_pembayaran` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `name`, `email`, `password`, `created_at`, `update_at`, `verification_token`, `is_verified`) VALUES
(7, 'Muhammad Natsir Hentihu', 'mnatsirh', 'hentihu.natsir@gmail.com', '$2b$10$N7o2zN45oALlyjRDzgCM1uK1on8sQB5NKE658klXHMAwjESrzcOd2', '2025-05-25 14:49:13', '2025-05-25 14:49:13', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `daftar_saya`
--
ALTER TABLE `daftar_saya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `content_id` (`content_id`);

--
-- Indexes for table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`content_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `paket_id` (`paket_id`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `daftar_saya`
--
ALTER TABLE `daftar_saya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `episode`
--
ALTER TABLE `episode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`);

--
-- Constraints for table `daftar_saya`
--
ALTER TABLE `daftar_saya`
  ADD CONSTRAINT `daftar_saya_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `daftar_saya_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`);

--
-- Constraints for table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `episode_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`);

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
