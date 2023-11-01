Registry Control Project
========================

Introduction
------------

The Registry Control Project is a web-based application designed to assist with various theatre-related controls, developed using SvelteKit. It aims to provide an intuitive and efficient user interface for managing different aspects of theatre operations.

Features
--------

### Developed Features

-   Show Mode Toggle: A toggle feature to enable or disable the show mode.
-   Projector Access: Access projector controls or display.
-   House Lights Control: Interface to control the house lights using the Sensor3 dimmer rack, with the help of `LxSlider` component and LX API calls.
-   Help Dashboard: A dedicated dashboard for help topics.
-   Contact Information: Display essential contact information for assistance.
-   Date and Rental Type Display: Show current date and the rental type of the theatre.

### In-Progress Features

-   Stage Lighting Control Page: A page with sliders to adjust different groups of stage lights.
-   Lighting Release Feature: A feature to hand over control from the application to the physical lighting board.
-   POE Power for Cameras: Control PTZ cameras remotely using Power over Ethernet (POE) technology, part of the camera control page.
-   PIN System for Feature Access: Implement a PIN-based system to unlock features or turn off show mode, along with a PIN entry history to track when each PIN was entered. Implemented using the `PinModal` component.

### Future Features

-   Show Mode: A reactive state that locks down the interface during a show, limiting what can be changed, using Svelte stores.
-   Rental State Tracking: Track feature access based on date/time and an external pocketbase database.
-   Video Control: Projector control for Christie projector, including power, shutter, presets, focus, and lens shift.
-   Camera Control: Ability to recall PTZ camera presets, possibly borrowing logic from the open-source Bitfocus Companion project.

System Health Monitoring
------------------------

Monitor the status of various systems and equipment in the theatre, providing alerts for any issues or required maintenance.

User Authentication and Authorization
-------------------------------------

Implement a PIN system to allow users to enter a PIN to unlock features or turn off show mode. This includes a PIN entry history to track when each PIN was entered.

Planning and Layout Guide
-------------------------

A systematic approach to plan and layout features for the project, ensuring a clear and structured development process.

Conclusion
----------

The Registry Control Project aims to enhance the theatre experience by providing a comprehensive set of tools for managing various aspects of theatre operations. With a focus on user-friendliness and efficiency, the project continues to evolve, adding new features and improving existing ones.