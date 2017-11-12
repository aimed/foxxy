<a name="1.11.1"></a>
## [1.11.1](https://github.com/aimed/foxxy/compare/v1.11.0...v1.11.1) (2017-11-12)


### Bug Fixes

* **MovieDetails:** makes things seem less cluttered ([8386d6a](https://github.com/aimed/foxxy/commit/8386d6a))



<a name="1.11.0"></a>
# [1.11.0](https://github.com/aimed/foxxy/compare/v1.10.2...v1.11.0) (2017-11-12)


### Bug Fixes

* **Filters:** localized filters ([6255d46](https://github.com/aimed/foxxy/commit/6255d46))


### Features

* **MovieDetails:** adds rating data ([a6e055d](https://github.com/aimed/foxxy/commit/a6e055d)), closes [#11](https://github.com/aimed/foxxy/issues/11)



<a name="1.10.2"></a>
## [1.10.2](https://github.com/aimed/foxxy/compare/v1.10.1...v1.10.2) (2017-11-12)


### Bug Fixes

* **Routes:** removes filters route ([466cddb](https://github.com/aimed/foxxy/commit/466cddb))



<a name="1.10.1"></a>
## [1.10.1](https://github.com/aimed/foxxy/compare/v1.10.0...v1.10.1) (2017-11-10)


### Bug Fixes

* **Filters:** applying a genre now applies immediately ([8908bed](https://github.com/aimed/foxxy/commit/8908bed)), closes [#10](https://github.com/aimed/foxxy/issues/10)



<a name="1.10.0"></a>
# [1.10.0](https://github.com/aimed/foxxy/compare/v1.9.0...v1.10.0) (2017-11-09)


### Features

* improves all things random ([557664f](https://github.com/aimed/foxxy/commit/557664f)), closes [#3](https://github.com/aimed/foxxy/issues/3) [#4](https://github.com/aimed/foxxy/issues/4) [#6](https://github.com/aimed/foxxy/issues/6)



<a name="1.9.0"></a>
# [1.9.0](https://github.com/aimed/foxxy/compare/v1.8.0...v1.9.0) (2017-11-09)


### Bug Fixes

* **RandomPage:** queries less pages when genre is selected ([9361efb](https://github.com/aimed/foxxy/commit/9361efb)), closes [#9](https://github.com/aimed/foxxy/issues/9)
* **RandomPage:** slightly improves randomized picking ([752274c](https://github.com/aimed/foxxy/commit/752274c))


### Features

* **Discover:** adds release_date.gte ([a5d5c40](https://github.com/aimed/foxxy/commit/a5d5c40))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/aimed/foxxy/compare/v1.7.0...v1.8.0) (2017-11-09)


### Features

* **Card:** adds avatars ([babf23a](https://github.com/aimed/foxxy/commit/babf23a))
* **Components:** adds a special MovieCard to display movies ([1c8a930](https://github.com/aimed/foxxy/commit/1c8a930))
* **Components:** adds Card component ([68b1aeb](https://github.com/aimed/foxxy/commit/68b1aeb))
* **MovieCard:** adds movie image ([a9db4c2](https://github.com/aimed/foxxy/commit/a9db4c2))
* **RandomPage:** adds a roll history ([bcb99e0](https://github.com/aimed/foxxy/commit/bcb99e0)), closes [#7](https://github.com/aimed/foxxy/issues/7)



<a name="1.7.0"></a>
# [1.7.0](https://github.com/aimed/foxxy/compare/v1.6.0...v1.7.0) (2017-11-07)


### Bug Fixes

* **TMDBConnection:** remove undefined and null values from queries ([7f40a24](https://github.com/aimed/foxxy/commit/7f40a24))


### Features

* **Localization:** adds lanuage parameters to relevant api calls ([cb9cc3b](https://github.com/aimed/foxxy/commit/cb9cc3b))
* **Localization:** adds localization to watchlist ([343aba9](https://github.com/aimed/foxxy/commit/343aba9))
* **Localization:** the RandomPage and the GenreList apply locales ([f497492](https://github.com/aimed/foxxy/commit/f497492)), closes [#5](https://github.com/aimed/foxxy/issues/5)



<a name="1.6.0"></a>
# [1.6.0](https://github.com/aimed/foxxy/compare/v1.5.0...v1.6.0) (2017-11-05)


### Bug Fixes

* **ClassNames:** fixes bug with class on objects ([4f0a604](https://github.com/aimed/foxxy/commit/4f0a604))
* **RandomPage:** fixes header overflow on narrow screens ([a2b33d5](https://github.com/aimed/foxxy/commit/a2b33d5))
* **scss:** removes all css files ([4f16ac6](https://github.com/aimed/foxxy/commit/4f16ac6))


### Features

* **Menu:** adds MaterialMenu ([f845b0e](https://github.com/aimed/foxxy/commit/f845b0e))
* **Menu:** adds MaterialMenuItem ([998984f](https://github.com/aimed/foxxy/commit/998984f))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/aimed/foxxy/compare/v1.4.3...v1.5.0) (2017-11-04)


### Bug Fixes

* **classnames:** accepts boolean expressions in array ([9e2e32c](https://github.com/aimed/foxxy/commit/9e2e32c))
* **FilterMenu:** adjust button style and makes it dense ([75422a6](https://github.com/aimed/foxxy/commit/75422a6))
* **FilterMenu:** marks applyFilters as action ([d981bd0](https://github.com/aimed/foxxy/commit/d981bd0))
* **PopoverMenu:** makes the border slightly transparent ([ae6c8e8](https://github.com/aimed/foxxy/commit/ae6c8e8))


### Features

* **Button:** adds material options to button ([80725d2](https://github.com/aimed/foxxy/commit/80725d2))
* **classnames:** adds classnames utility to construct classNames ([a8e7dc0](https://github.com/aimed/foxxy/commit/a8e7dc0))
* **Design:** moves to material-components for most components ([d71bd63](https://github.com/aimed/foxxy/commit/d71bd63))



<a name="1.4.3"></a>
## [1.4.3](https://github.com/aimed/foxxy/compare/v1.4.2...v1.4.3) (2017-11-03)


### Bug Fixes

* **filters:** makes filters part of the random page again ([46ed67a](https://github.com/aimed/foxxy/commit/46ed67a))
* **filters:** only allow to select a single genre ([e7d5762](https://github.com/aimed/foxxy/commit/e7d5762))
* **filters:** replaces custom genre selector with default select ([9c8d78a](https://github.com/aimed/foxxy/commit/9c8d78a))
* **RandomPage:** automatically rerolls when filters update ([c54fe91](https://github.com/aimed/foxxy/commit/c54fe91))
* **spinner:** container has min height to always fit the spinner ([7d3c301](https://github.com/aimed/foxxy/commit/7d3c301))



<a name="1.4.2"></a>
## [1.4.2](https://github.com/aimed/foxxy/compare/v1.4.1...v1.4.2) (2017-11-02)


### Bug Fixes

* **FilterMenu:** fixes missing observer attribute ([a97eb9d](https://github.com/aimed/foxxy/commit/a97eb9d))
* **filters:** applies selected genres when using watchlist ([330dbcf](https://github.com/aimed/foxxy/commit/330dbcf))
* **QueryRenderer:** fixes a bug that prevents the query from updating ([410d4cc](https://github.com/aimed/foxxy/commit/410d4cc))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/aimed/foxxy/compare/v1.4.0...v1.4.1) (2017-11-02)


### Bug Fixes

* **snapshot:** fixes localStorage access with snapshot ([cf5c6b8](https://github.com/aimed/foxxy/commit/cf5c6b8))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/aimed/foxxy/compare/v1.3.1...v1.4.0) (2017-11-02)


### Bug Fixes

* **button:** centers content ([217b271](https://github.com/aimed/foxxy/commit/217b271))
* **button:** makes sound optional ([17ba9de](https://github.com/aimed/foxxy/commit/17ba9de))


### Features

* **filters:** properly implements random movie filters ([da78279](https://github.com/aimed/foxxy/commit/da78279))
* **QueryRenderer:** adds variables ([8dfe549](https://github.com/aimed/foxxy/commit/8dfe549))
* **tmdb:** connection now caches get queries ([3979c7e](https://github.com/aimed/foxxy/commit/3979c7e))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/aimed/foxxy/compare/v1.3.0...v1.3.1) (2017-10-28)


### Bug Fixes

* **button:** makes plain buttons actually plain ([60fa423](https://github.com/aimed/foxxy/commit/60fa423))
* **header:** removes username + minor refactoring ([ec14e4f](https://github.com/aimed/foxxy/commit/ec14e4f))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/aimed/foxxy/compare/v1.2.0...v1.3.0) (2017-10-28)


### Bug Fixes

* **button:** button content aligns verically centered now ([6ac986a](https://github.com/aimed/foxxy/commit/6ac986a))
* **finalize-auth-page:** changes spinner message ([05f6b86](https://github.com/aimed/foxxy/commit/05f6b86))
* **popover:** popover adjusts to content width ([958dce3](https://github.com/aimed/foxxy/commit/958dce3))
* **randomPage:** properly waits for account to fetch watchlist ([e9efefb](https://github.com/aimed/foxxy/commit/e9efefb))


### Features

* **connectionStore:** adds ability to wait for account data to load ([1eaf9cd](https://github.com/aimed/foxxy/commit/1eaf9cd))
* **user:** adds gravatar to username ([79c526e](https://github.com/aimed/foxxy/commit/79c526e))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/aimed/foxxy/compare/v1.1.0...v1.2.0) (2017-10-27)


### Bug Fixes

* **popover:** fixes display of buttons as label ([f99d7a1](https://github.com/aimed/foxxy/commit/f99d7a1))
* **user:** only displays user menu when account is loaded ([d323c3e](https://github.com/aimed/foxxy/commit/d323c3e))


### Features

* **account:** ability to log in/out + refactoring ([a27b349](https://github.com/aimed/foxxy/commit/a27b349))
* **account:** adds avatars ([854a848](https://github.com/aimed/foxxy/commit/854a848))
* **icons:** adds ExpandMore icons ([ab6a8ae](https://github.com/aimed/foxxy/commit/ab6a8ae))
* **page:** adds icon to header ([d863f80](https://github.com/aimed/foxxy/commit/d863f80))
* **session:** adds ability to add delegates to observe sessions ([82888e6](https://github.com/aimed/foxxy/commit/82888e6))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/aimed/foxxy/compare/v1.0.2...v1.1.0) (2017-10-22)


### Features

* **build:** generates static sites for surge ([26c6c2b](https://github.com/aimed/foxxy/commit/26c6c2b))
* **details:** adds date to movie details ([a1cdfb9](https://github.com/aimed/foxxy/commit/a1cdfb9))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/aimed/foxxy/compare/v1.0.1...v1.0.2) (2017-10-22)


### Bug Fixes

* **RandomPage:** actually disables login for now ([8bc3228](https://github.com/aimed/foxxy/commit/8bc3228))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/aimed/foxxy/compare/v1.0.0...v1.0.1) (2017-10-22)


### Bug Fixes

* **RandomPage:** disables login for now ([4773dde](https://github.com/aimed/foxxy/commit/4773dde))



<a name="1.0.0"></a>
# 1.0.0 (2017-10-22)


### Bug Fixes

* **AccountStore:** fixes file name ([58ff839](https://github.com/aimed/foxxy/commit/58ff839))
* **AccountStore:** fixes filename in dependents ([1973891](https://github.com/aimed/foxxy/commit/1973891))
* **App:** removes default export ([eb0eb41](https://github.com/aimed/foxxy/commit/eb0eb41))
* **init:** first public release; changes visual/usuability ([273b16c](https://github.com/aimed/foxxy/commit/273b16c))
* **osx:** fixes file name case ([4e6a8e5](https://github.com/aimed/foxxy/commit/4e6a8e5))


### Features

* **QueryRenderer:** accepts null and stateless components ([e323134](https://github.com/aimed/foxxy/commit/e323134))
* **RandomPage:** adds genre list ([bd24c45](https://github.com/aimed/foxxy/commit/bd24c45))



