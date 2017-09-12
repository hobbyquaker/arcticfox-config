#!/bin/bash

UDEVFILE="/etc/udev/rules.d/99-nuvoton-hid.rules"

echo "creating $UDEVFILE"

echo "# HIDAPI/libusb" > $UDEVFILE
echo "SUBSYSTEM==\"usb\", ATTRS{idVendor}==\"0416\", ATTRS{idProduct}==\"5020\", MODE=\"0666\"" >> $UDEVFILE
echo "" >> $UDEVFILE
echo "# HIDAPI/hidraw" >> $UDEVFILE
echo "KERNEL==\"hidraw*\", ATTRS{busnum}==\"1\", ATTRS{idVendor}==\"0416\", ATTRS{idProduct}==\"5020\", MODE=\"0666\"" >> $UDEVFILE
