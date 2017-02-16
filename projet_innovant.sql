-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 16 Février 2017 à 11:26
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `projet_innovant`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `idCategories` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`idCategories`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`idCategories`, `name`) VALUES
(1, 'festive'),
(2, 'musicale'),
(3, 'culturelle'),
(4, 'sportive'),
(5, 'ludique'),
(6, 'commerciale');

-- --------------------------------------------------------

--
-- Structure de la table `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `idCities` int(11) NOT NULL AUTO_INCREMENT,
  `localisation` varchar(100) NOT NULL,
  PRIMARY KEY (`idCities`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `idComments` int(11) NOT NULL AUTO_INCREMENT,
  `idUsers` int(11) NOT NULL,
  `text` varchar(140) NOT NULL,
  `picture` varchar(200) NOT NULL,
  `video` varchar(200) NOT NULL,
  PRIMARY KEY (`idComments`,`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `idEvents` int(11) NOT NULL AUTO_INCREMENT,
  `idUsers` int(11) NOT NULL,
  `idCategories` int(11) NOT NULL,
  `idCities` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `address` varchar(100) NOT NULL,
  `picture` varchar(200) NOT NULL,
  `hot` int(10) NOT NULL DEFAULT '0',
  `check` int(10) NOT NULL DEFAULT '0',
  `omw` int(10) NOT NULL DEFAULT '0',
  `coord` varchar(20) NOT NULL,
  PRIMARY KEY (`idEvents`,`idUsers`,`idCategories`,`idCities`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `events`
--

INSERT INTO `events` (`idEvents`, `idUsers`, `idCategories`, `idCities`, `name`, `address`, `picture`, `hot`, `check`, `omw`, `coord`) VALUES
(1, 1, 1, 1, 'exemple', '13 rue Michel Ney', '', 0, 0, 0, '48.6972949,6.1690946');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `idMessages` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(140) NOT NULL,
  PRIMARY KEY (`idMessages`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `idUsers` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `picture` varchar(200) NOT NULL,
  `points` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUsers`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`idUsers`, `name`, `firstname`, `mail`, `pseudo`, `password`, `picture`, `points`) VALUES
(1, 'ris', 'charles', 'ris.charles@gmail.com', 'ris', 'password', '', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
