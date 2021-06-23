import * as React from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import {Paragraph, Portal, Dialog} from 'react-native-paper';

const isIOS = Platform.OS === 'ios';

const DialogWithLoadingIndicator = ({visible, close, title, content}) => (
    <Portal>
        <Dialog onDismiss={close} visible={visible}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ActivityIndicator
                        size={isIOS ? 'large' : 48}
                        style={{marginRight: 16}}
                    />
                    <Paragraph>{content}</Paragraph>
                </View>
            </Dialog.Content>
        </Dialog>
    </Portal>
);

export default DialogWithLoadingIndicator;